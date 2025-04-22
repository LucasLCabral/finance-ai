import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.error();
  }
  if (!process.env.STRIPE_WEBHOOK_SECRET || !process.env.STRIPE_SECRET_KEY) {
    throw NextResponse.error();
  }
  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-03-31.basil",
  });
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  switch (event.type) {
    case "invoice.paid":
      // Atualizar o usuário com novo plano
      const invoice = event.data.object as Stripe.Invoice;
      const customer = invoice.customer as string;

      const lineItem = invoice?.lines?.data?.[0];

      interface SubscriptionDetails {
        subscription: string;
        metadata?: {
          clerk_user_id?: string;
        };
      }

      interface CustomParent {
        subscription_details?: SubscriptionDetails;
      }

      const parent = lineItem?.parent as unknown as CustomParent;

      const subscriptionId = parent?.subscription_details?.subscription;
      const clerkUserId = parent?.subscription_details?.metadata?.clerk_user_id;

      if (!clerkUserId || !subscriptionId) {
        console.error("Metadata ou subscriptionId não encontrados");
        return NextResponse.error();
      }
      const client = await clerkClient();
      await client.users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: customer,
          stripeSubscriptionId: subscriptionId,
        },
        publicMetadata: {
          subscriptionPlan: "premium",
        },
      });
      break;
  }
  return NextResponse.json({ received: true }, { status: 200 });
};
