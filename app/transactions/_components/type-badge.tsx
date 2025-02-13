import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionTypeProps {
  transaction: Transaction;
}

const TransactionTypeBadge = ({ transaction }: TransactionTypeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="gap-1 bg-green-950 text-primary hover:bg-green-950">
        <CircleIcon className="fill-primary" size={8} />
        Ganho
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="gap-1 bg-red-950 font-bold text-red-600 hover:bg-red-950">
        <CircleIcon className="fill-red-700" size={8} />
        Gasto
      </Badge>
    );
  }
  if (transaction.type === TransactionType.INVESTMENT) {
    return (
      <Badge className="gap-1 bg-muted font-bold text-zinc-200 hover:bg-muted">
        <CircleIcon className="fill-zinc-200" size={8} />
        Investimento
      </Badge>
    );
  }
};

export default TransactionTypeBadge;
