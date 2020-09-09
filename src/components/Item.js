import React, { useState, useContext, useReducer } from "react";


const Item = ({urlImages,category,name,cost}) =>{

    return (
    <div className="product-card">
        <div className="photo line">
            <img src={urlImages}></img>
        </div>
        <div className="info">
    <div className="category">{category}</div>
    <div className="name-product">{name} <span>cost: {cost}</span></div>
        </div>
    </div>
    );
}

export default Item;