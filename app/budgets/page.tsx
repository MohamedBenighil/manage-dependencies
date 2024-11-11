"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import Notification from "../components/Notification";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { aadBudget, getBudgetsByUser } from "../actions";
import {} from "../actions";
import { Budget } from "@/type";
//import { Budget } from "../../type";

const page = () => {
  const [budgetName, setbudgetName] = useState<string>("");
  const [budgetAmount, setbudgetAmount] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [showNotification, setShowNotification] = useState<string>("");
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const { user } = useUser();

  const handleNotification = () => {
    setShowNotification("");
  };

  const hundleAddBudget = async () => {
    try {
      const amount = parseFloat(budgetAmount);

      if (isNaN(amount) || amount < 0) {
        throw new Error("le montant doit etre un nombre >= 0");
      }

      if (user?.primaryEmailAddress?.emailAddress) {
        await aadBudget(
          user.primaryEmailAddress.emailAddress,
          budgetName,
          amount,
          selectedEmoji
        );
      }
      setbudgetName("");
      setbudgetAmount("");
      setSelectedEmoji("");
      setShowNotification("the budget added with success");

      const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
      if (modal) {
        modal.close();
      }
    } catch (error) {
      setShowNotification("" + error);
    }
  };

  const fetchBudgets = async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      try {
        const userBudgets = await getBudgetsByUser(
          user.primaryEmailAddress.emailAddress
        );
        userBudgets && setBudgets(userBudgets);
      } catch (error) {
        setShowNotification("" + error);
      }
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, [user?.primaryEmailAddress?.emailAddress]);

  return (
    <Wrapper>
      <button
        className="btn"
        onClick={() =>
          (
            document.getElementById("my_modal_3") as HTMLDialogElement
          ).showModal()
        }
      >
        + Budget
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Création d'un budget</h3>
          <p className="py-4">Permet de controler ses dépenses facilement</p>
          <div className="flex flex-col gap-4">
            <input
              className="btn "
              type="text"
              name="name"
              id="name"
              placeholder="Nom du budget"
              required
              value={budgetName}
              onChange={(e) => {
                setbudgetName(e.target.value);
              }}
            />
            <input
              className="btn"
              type="number"
              name="amount"
              id="amount"
              placeholder="Montant du Budget"
              required
              value={budgetAmount}
              onChange={(e) => {
                setbudgetAmount(e.target.value);
              }}
            />
            <input
              className="btn"
              type="button"
              value={selectedEmoji || "selectionner un emoji 🫵 "}
              onClick={(e) => setShowEmoji(!showEmoji)}
            />
            {showEmoji && (
              <div className="flex items-center justify-center">
                <EmojiPicker
                  onEmojiClick={(e) => {
                    setSelectedEmoji(e.emoji);
                    setShowEmoji(false);
                  }}
                />
              </div>
            )}

            <input
              className="btn"
              type="button"
              value="Ajouter Budget"
              onClick={hundleAddBudget}
            />
          </div>
        </div>
      </dialog>
      {showNotification && (
        <Notification message={showNotification} onClose={handleNotification} />
      )}

      <ul className="grid md:grid-cols-3 ">
        {budgets.map((budget) => {
          return (
            <li key={budget.id} className="">
              {" "}
              test
            </li>
          );
        })}
      </ul>
    </Wrapper>
  );
};

export default page;
