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
    case "invoice.payment_succeeded": {
      const invoicePaymentSucceeded = event.data.object;
      const subscription_details =
        invoicePaymentSucceeded.parent!.subscription_details;
      const customer = invoicePaymentSucceeded.customer;
      const subscription = subscription_details!.subscription;
      const clerkUserId = subscription_details!.metadata!.clerk_user_id;

      if (!clerkUserId) {
        return NextResponse.error();
      }
      (await clerkClient()).users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: customer,
          stripeSubscriptionId: subscription,
        },
        publicMetadata: {
          subscriptionPlan: "premium",
        },
      });
      break;
    }
    case "customer.subscription.deleted": {
      const subscriptionDeleted = event.data.object;
      const clerkUserId = subscriptionDeleted.metadata.clerk_user_id;
      if (!clerkUserId) {
        return NextResponse.error();
      }
      (await clerkClient()).users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeSubscriptionId: null,
          stripeCustomerId: null,
        },
        publicMetadata: {
          subscriptionPlan: null,
        },
      });
      break;
    }
  }
  return NextResponse.json({ received: true }, { status: 200 });
};
