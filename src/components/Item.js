import React, { useState, useContext, useReducer } from "react";
import bagShape from "../assets/icons/bagShape.png";

const Item = ({ urlImages, category, name, cost, points }) => {
  return (
    <div className="product-card">
      <div className="IconExchange">
        {cost <= points ? (
          <div className="Icon">
            <img src={bagShape}></img>
          </div>
        ) : (
          <div className="IconYouneed">
            <p>You need {cost - points}</p>
            <div className="money"></div>
          </div>
        )}
      </div>

      <div className="photo line">
        <img src={urlImages}></img>
      </div>
      <div className="info">
        <div className="category">{category}</div>
        <div className="name-product">
          {name} <span>cost: {cost}</span>
        </div>
      </div>

      {cost <= points &&       
      <div className="overlay">
<div className="text">Hola puedes cambiar tus puntos</div>
      </div>
      }
    </div>
  );
};

export default Item;
