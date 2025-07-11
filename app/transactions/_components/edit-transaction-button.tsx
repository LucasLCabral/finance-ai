"use client";

import { useState } from "react";
import { EditIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import UpsertTransactionDialog from "@/app/_components/upsert-transaction-dialog";
import { Transaction } from "@prisma/client";

interface EditTransactionButtonProps {
  transaction: Transaction;
}

const EditTransactionButton = ({ transaction }: EditTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        className="hover:bg-zinc-800"
        onClick={() => setDialogIsOpen(true)}
      >
        <EditIcon />
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
          date:
            transaction.date instanceof Date
              ? transaction.date
              : new Date(transaction.date),
        }}
        transactionId={transaction.id}
      />
    </>
  );
};

export default EditTransactionButton;
