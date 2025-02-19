import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/types";
import { Progress } from "@/app/_components/ui/progress";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_CATEGORY_LABELS } from "@/app/_constants/transactions";

interface ExpensesPerCategoryProps {
  expensesPerCategory: TotalExpensePerCategory[];
}

const ExpensesPerCategory = ({
  expensesPerCategory,
}: ExpensesPerCategoryProps) => {
  return (
    <ScrollArea className="col-span-2 h-full rounded-md border pb-6">
      <CardHeader>
        <CardTitle className="pb-6 font-bold">Gastos por categoria</CardTitle>

        <CardContent className="flex flex-col gap-6">
          {expensesPerCategory.map((category) => (
            <div key={category.category} className="space-y-2">
              <div className="flex w-full justify-between">
                <p className="text-sm font-bold">
                  {TRANSACTION_CATEGORY_LABELS[category.category]}
                </p>
                <p className="text-sm font-bold">
                  {category.percentageOfTotal}%
                </p>
              </div>
              <Progress value={category.percentageOfTotal} />
            </div>
          ))}
        </CardContent>
      </CardHeader>
    </ScrollArea>
  );
};

export default ExpensesPerCategory;
