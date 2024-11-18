"use client";
import { redirect, useParams, useRouter } from "next/navigation";

import { Budget } from "@/type";
import React, { useEffect, useState } from "react";

import BudgetItem from "@/app/components/BudgetItem";
import {
  addTransaction,
  deleteBudget,
  deleteTranscation,
  getBudgetById,
} from "@/app/actions";
import Wrapper from "@/app/components/Wrapper";
import ConfirmDelete from "@/app/components/confirmDelete";
import { Trash } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Notification from "@/app/components/Notification";

const page = () => {
  const params = useParams<{ id: string }>();
  const [budget, setBudget] = useState<Budget>();
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [showNotification, setShowNotification] = useState<string>("");

  const { user } = useUser();
  const router = useRouter();

  //Done
  const fetchBudget = async () => {
    if (params.id && user?.primaryEmailAddress?.emailAddress) {
      try {
        const budget = await getBudgetById(
          user.primaryEmailAddress.emailAddress,
          params.id
        );
        budget && setBudget(budget);
      } catch (error) {
        console.log(error);
      }
    }
  };

  //Done
  const handleAddTransaction = async () => {
    if (!amount || !description) {
      setShowNotification("Veuillez rensigner tout les champs");
      return;
    }
    if (params.id && user?.primaryEmailAddress?.emailAddress) {
      try {
        const transactionAmount = parseInt(amount);
        if (isNaN(transactionAmount) || transactionAmount < 0) {
          throw new Error("Donner un montant positif");
        }

        const remainder =
          (budget?.amount || 0) -
          (budget?.transactions?.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
          ) || 0);

        if (transactionAmount > remainder) {
          setShowNotification("il vous reste : " + remainder);
          return;
        }

        user?.primaryEmailAddress?.emailAddress &&
          (await addTransaction(
            user.primaryEmailAddress.emailAddress,
            params.id,
            description,
            transactionAmount
          ));

        setShowNotification("the transaction added with success");
        setAmount("");
        setDescription("");

        fetchBudget();
      } catch (error) {
        setShowNotification("" + error);
      }
    }
  };

  //Done
  const handleDeleteTransaction = async (transactionId: string) => {
    try {
      await deleteTranscation(transactionId);
      fetchBudget();
    } catch (error) {
      console.log(error);
    }
  };

  //TODO
  const handleDeleteBudget = async (budgetId: string) => {
    try {
      await deleteBudget(budgetId);
      // redirect("/budgets");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, [params.id, user?.primaryEmailAddress?.emailAddress]);

  return (
    <Wrapper>
      {budget && (
        <>
          <div className="flex justify-between  gap-5">
            <div className="flex flex-col gap-5 w-1/3">
              <ul>{budget && <BudgetItem budget={budget} />}</ul>

              <div>
                <button
                  className="btn"
                  onClick={() => {
                    (
                      document.getElementById(
                        `${budget.id}`
                      ) as HTMLDialogElement
                    ).showModal();
                  }}
                >
                  Supprimer le budget
                </button>
                <dialog id={budget.id} className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">are you sure to delete the Budget ?</p>
                    <button
                      type="button"
                      className="btn btn-error"
                      onClick={() => {
                        handleDeleteBudget(budget.id);
                        router.push("/budgets");
                      }}
                    >
                      delete
                    </button>
                  </div>
                </dialog>
              </div>

              {/* <ConfirmDelete msg={budget.id} /> */}
              {/* Add transaction */}
              <input
                type="text"
                name="description"
                id="description"
                className="btn text-left bg-transparent hover:bg-transparent outline-none "
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <input
                type="number"
                name="montant"
                id="montant"
                className="btn text-left bg-transparent hover:bg-transparent outline-none "
                placeholder="Montant"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              <button
                type="button"
                className="btn"
                onClick={handleAddTransaction}
              >
                Ajouter votre déponse
              </button>
              {/* End add transation  */}
            </div>
            <div className="overflow-x-auto w-2/3">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Montant</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Heure</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {budget?.transactions &&
                    budget?.transactions.map((transaction) => {
                      return (
                        <tr key={transaction.id}>
                          <th className="text-3xl">{transaction.emoji}</th>
                          <td>
                            <div className="badge badge-accent badge-sm">
                              {transaction.amount}
                            </div>
                          </td>
                          <td>{transaction.description}</td>
                          <td>
                            {transaction.createdAt.toISOString().slice(0, 10)}
                          </td>
                          <td>
                            {transaction.createdAt.toISOString().slice(11, 19)}
                          </td>
                          <td>
                            <div>
                              <button
                                className="btn btn-sm"
                                onClick={() => {
                                  (
                                    document.getElementById(
                                      `${transaction.id}`
                                    ) as HTMLDialogElement
                                  ).showModal();
                                }}
                              >
                                <Trash className="w-4 h-4" />
                              </button>
                              <dialog id={transaction.id} className="modal">
                                <div className="modal-box">
                                  <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                      ✕
                                    </button>
                                  </form>
                                  <h3 className="font-bold text-lg">Hello!</h3>
                                  <p className="py-4">
                                    are you sure to delete the transaction ?
                                  </p>
                                  <button
                                    type="button"
                                    className="btn btn-error"
                                    onClick={() => {
                                      handleDeleteTransaction(transaction.id);
                                    }}
                                  >
                                    delete
                                  </button>
                                </div>
                              </dialog>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          {showNotification && (
            <Notification
              message={showNotification}
              onClose={() => {
                setShowNotification("");
              }}
            />
          )}
        </>
      )}
    </Wrapper>
  );
};

export default page;
