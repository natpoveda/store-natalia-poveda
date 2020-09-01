import React, { useState, useContext, useReducer } from "react";
import { HeaderContext } from "../contexts/contextProviderHeader";
import reducer from "../reducers/userReducer";

const User = () => {
  const { user, setUser } = useContext(HeaderContext);

  console.log("Useruser", user);
  const estadoForm = {
    m1000: false,
    m5000: false,
    m7500: false,
    disabled : true
  };


  const [state, dispatch] = useReducer(reducer, estadoForm);
  const {m1000,m5000,m7500,disabled} = state;

 if (user != null){
     let mm = user.redeemHistory;
     console.log("MM",mm.slice(0, 10));
 }
  
  return (
    <div>
      <div className="container centered">
        <div className="white ">
          <form className="custom-form">
            <span>1000 Points</span>
            <input
              id="m1000"
              name="m1000"
              type="checkbox"
              checked={m1000}
              onChange={() => dispatch({ type: "eventChange" , id:"m1000"})}
            />
            <span>5000 Points</span>
            <input
              id="m5000"
              name="m5000"
              type="checkbox"
              checked={m5000}
              onChange={() => dispatch({ type: "eventChange" , id:"m5000"})}
            />
            <span>7500 Points</span>
            <input
              id="m7500"
              name="m7500"
              type="checkbox"
              checked={m7500}
              onChange={() => dispatch({ type: "eventChange" , id:"m7500"})}
            />

            <button
              disabled={disabled}
              className={`btn ${disabled ? "disabled" : ""}`}
              onClick={() => dispatch({ type: "handleChangePoints"})}
            >
              Add Points
            </button>
          </form>

           <div className="history">

            </div> 

        </div>
      </div>
    </div>
  );
};

export default User;
