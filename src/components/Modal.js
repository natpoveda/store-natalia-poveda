import React, { useContext } from "react";
import { ProductsContext } from "../contexts/contextProviderProducts";
import orange1 from "../assets/icons/orange1.gif";
import orange2 from "../assets/icons/orange2.gif";

const Modal = () => {
  const { modal, setModal } = useContext(ProductsContext);

  let active = "";
  let type = "";

  if (modal != null) {
    active = modal.active;
    type = modal.type;
  }

  return (
    <div className={`fondo_transparente ${active ? "active" : "no-active"}`}>
      <div className="modal">
        {type === "success" ? (
          <div className={`interna ${type}`}>
            <img src={orange1} alt="success"></img>
            <h1>Success!!</h1>
            <p>Yes! You wanted it, You got it!</p>

            <button
              className="success"
              onClick={() => setModal({ active: 0, type: "wrong" })}
            >
              CONTINUE!
            </button>
          </div>
        ) : (
          <div className={`interna ${type}`}>
            <img src={orange2} alt="error"></img>
            <h1>Error!!</h1>
            <p>Sorry! Something went wrong!</p>
            <button
              className="wrong"
              onClick={() => setModal({ active: 0, type: "wrong" })}
            >
              TRY AGAIN!
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
