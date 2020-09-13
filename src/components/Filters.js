import React, { useState, useContext, useReducer,useCallback, useEffect } from "react";
import producsreducer from "../reducers/productsReducer";
import { ProductsContext } from "../contexts/contextProviderProducts";

const Filters = () => {
 
  const { products, setProducts} = useContext(ProductsContext);
  
  const estadoItems = { changed: 0, products};
 // const reducerMemo = useCallback(producsreducer, []);
  const [state, dispatch] = useReducer(producsreducer, estadoItems);

  const toggle =() => {
    console.log("entro a state",state);
    if (state != null){
        console.log("estado not null");
        setProducts(state.products); 
    }  
   };
  
  useEffect(() => {
      toggle();
  },[state]);
  
  return (
    <div className="white-form">
    <form className="custom-form">
      <button
        className="btn active"
        onClick={() => dispatch({ type: "orderByCost", products})}
      >
        By Cost
      </button>
    </form>
  </div>
  );
  
}

export default Filters;