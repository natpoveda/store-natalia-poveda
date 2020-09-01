import React, { useState, useContext, useReducer } from "react";


const RedemItem = ({urlImages,category,name,cost}) =>{

    console.log("Props",urlImages);

    console.log("Image", urlImages.naturalWidth);
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

export default RedemItem;