"use client";
import React, { useEffect } from "react";

import Wrapper from "../components/Wrapper";
import EmojiPicker from "emoji-picker-react";

const page = () => {
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
            />
            <input
              className="btn"
              type="number"
              name="amount"
              id="amount"
              placeholder="Montant du Budget"
              required
            />

            <div className="flex items-center justify-center">
              <EmojiPicker />
            </div>
            <input className="btn" type="button" value="Ajouter Budget" />
          </div>
        </div>
      </dialog>
    </Wrapper>
  );
};

export default page;
