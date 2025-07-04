import AddTransactionButton from "@/app/_components/add-transaction-button";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import { ReactNode } from "react";

interface SummaryCardProps {
  icon: ReactNode;
  title: string;
  amount: number;
  size?: "small" | "large";
  className?: string;
  userCanAddTransaction?: boolean;
}

const SummaryCard = ({
  icon,
  title,
  amount,
  size = "small",
  className,
  userCanAddTransaction,
}: SummaryCardProps) => {
  return (
    <>
      <Card className={className}>
        <CardHeader className="flex-row items-center gap-2">
          {icon}
          <p
            className={`${size === "small" ? "text-muted-foreground" : "text-white opacity-70"}`}
          >
            {title}
          </p>
        </CardHeader>
        <CardContent className="flex justify-between">
          <p
            className={`font-bold ${size === "small" ? "text-2xl" : "text-4xl"}`}
          >
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(amount)}
          </p>

          {size === "large" && (
            <AddTransactionButton
              userCanAddTransaction={userCanAddTransaction ?? false}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default SummaryCard;
