import { Budget } from "@/type";
import React from "react";

interface BudgetItemProps {
  budget: Budget;
  enableHover?: boolean;
}
const BudgetItem = ({ budget, enableHover }: BudgetItemProps) => {
  const nbTransaction = budget.transactions?.length;
  const totalDesTransactionAmount =
    budget.transactions?.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    ) || 0;
  const restBudget = budget.amount - totalDesTransactionAmount;
  const persontage = (totalDesTransactionAmount / budget.amount) * 100;
  const hoverClass = enableHover ? "hover:border-accent hover:shadow-xl" : "";
  return (
    <li className={"border-2 rounded-lg p-3 list-nonex " + hoverClass}>
      {/* top */}
      <div className="flex justify-between ">
        <div className="flex gap-2">
          <div className="flex items-center justify-center text-xl  rounded-full">
            {budget.emoji ? (
              <span className=" flex items-center justify-center text-xl rounded-full  bg-orange-200   p-1">
                {budget.emoji}
              </span>
            ) : (
              <span className=" flex items-center justify-center text-xl text-transparent bg-orange-200 rounded-full  p-4"></span>
            )}
          </div>

          <div>
            <div className="font-bold text-lg"> {budget.name}</div>
            <div className=" text-gray-400 text-sm">
              {nbTransaction} transaction(s)
            </div>
          </div>
        </div>
        <div className="font-bold text-lg text-accent">{budget.amount} $</div>
      </div>
      {/* medium */}
      <div className="flex justify-between text-gray-400 mt-5 ">
        <div className="text-sm">{totalDesTransactionAmount} $ dépensés</div>
        <div className="text-sm">{restBudget} $ restants</div>
      </div>
      {/* bottom */}
      <div className="mt-2">
        <progress
          className="progress progress-accent w-full"
          value={persontage}
          max="100"
        ></progress>
      </div>
    </li>
  );
};

export default BudgetItem;
