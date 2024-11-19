"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { getBudgetsByUser } from "../actions";
import { Budget } from "@/type";

const Page = () => {
  const [lastxdays, setLastxdays] = useState<number>(7);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const { user } = useUser();

  const fetchBudgets = async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      try {
        const userBudgets = await getBudgetsByUser(
          user.primaryEmailAddress.emailAddress,
          lastxdays
        );
        userBudgets && setBudgets(userBudgets);
        // console.log(lastxdays);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchBudgets();
    console.log(lastxdays);
  }, [user?.primaryEmailAddress?.emailAddress, lastxdays]);
  return (
    <Wrapper>
      <div className="flex items-center justify-end ">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn m-1 bg-transparent ">
            Dernière {lastxdays} jours
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-sm z-[1]  p-0 shadow  items-start "
          >
            <li className=" w-full  ">
              <button
                className="btn btn-sm rounded-none text-start w-full pl-0 hover:bg-blue-500 hover:text-white bg-white border-none"
                onClick={async () => {
                  await fetchBudgets();

                  setLastxdays(7);
                }}
              >
                Dernière 7 jours
              </button>
            </li>
            <li className=" w-full  ">
              <button
                className="btn btn-sm rounded-none pl-1 hover:bg-blue-500 hover:text-white bg-white border-none"
                onClick={async () => {
                  await fetchBudgets();

                  setLastxdays(30);
                }}
              >
                Dernière 30 jours
              </button>
            </li>
            <li className="w-full text-left">
              <button
                className="btn btn-sm rounded-none pl-1  hover:bg-blue-500 hover:text-white bg-white border-none"
                onClick={async () => {
                  await fetchBudgets();

                  setLastxdays(90);
                }}
              >
                Dernière 90 jours
              </button>
            </li>
            <li className="w-full text-left">
              <button
                className="btn btn-sm rounded-none  hover:bg-blue-500 hover:text-white  bg-white border-none"
                onClick={async () => {
                  await fetchBudgets();
                  setLastxdays(365);
                }}
              >
                Dernière 365 jours
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto bg-gray-200/50 mt-4">
          <table className="table">
            <tbody>
              {budgets.map((budget) =>
                budget.transactions?.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      <Link href={`/budgets/${budget.id}`} className="btn">
                        <div className="badge badge-accent">
                          {transaction.amount}
                        </div>
                        {budget.name}
                      </Link>
                    </td>
                    <th>{transaction.description}</th>
                    <td>
                      {transaction.createdAt.toLocaleDateString("FR-fr")} à
                      {transaction.createdAt.toLocaleTimeString("FR-fr")}
                    </td>
                    <td className="flex justify-end">
                      <Link href={`/budgets/${budget.id}`} className="btn">
                        Voire plus
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Wrapper>
  );
};

export default Page;
