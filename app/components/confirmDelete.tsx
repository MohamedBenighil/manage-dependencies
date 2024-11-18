import React, { useState } from "react";
interface ConfirmDeleteProps {
  id: string;
}

const ConfirmDelete = ({ id }: ConfirmDeleteProps) => {
  const [identifiant, setIdentifiant] = useState<string>(id);
  return (
    <div>
      <button
        className="btn"
        onClick={() =>
          (
            document.getElementById("my_modal_3") as HTMLDialogElement
          ).showModal()
        }
      >
        open modal
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                console.log(identifiant);
                setIdentifiant("");
              }}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">{identifiant}</p>
        </div>
      </dialog>
    </div>
  );
};

export default ConfirmDelete;
