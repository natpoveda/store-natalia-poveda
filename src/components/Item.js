import React, { useContext, useReducer, useCallback, useEffect } from "react";
import bagShape from "../assets/icons/bagShape.png";
import producsreducer from "../reducers/productsReducer";
import { ProductsContext } from "../contexts/contextProviderProducts";
import { HeaderContext } from "../contexts/contextProviderHeader";

const Item = ({ urlImages, category, name, cost, points, redeem, id, key }) => {
  const { setModal } = useContext(ProductsContext);
  const { user, setUser } = useContext(HeaderContext);

  const estadoItems = {
    cost,
    points,
    active: 0,
    type: "wrong",
  };

  const reducerMemo = useCallback(producsreducer, []);
  const [state, dispatch] = useReducer(reducerMemo, estadoItems);

  const toggle = () => {
    if (state != null) {
      setModal({ active: state.active, type: state.type });
      setUser({ ...user, points: state.points });
    }
  };

  useEffect(() => {
    toggle();
  }, [state]);

  return (
    <div className="product-card" key={`pc${key}`}>
      {redeem && (
        <div className="IconExchange">
          {cost <= points ? (
            <div className="Icon">
              <img src={bagShape} alt="bagShape Icon"></img>
            </div>
          ) : (
            <div className="IconYouneed">
              <p>You need {cost - points}</p>
              <div className="money"></div>
            </div>
          )}
        </div>
      )}

      <div className="photo line">
        <img src={urlImages} alt={name}></img>
      </div>
      <div className="info">
        <div className="category">{category}</div>
        <div className="name-product">
          {name} <span>cost: {cost}</span>
        </div>
      </div>

      {cost <= points && (
        <div className="overlay">
          <div className="infoover">
            <h3>{cost}</h3>

            <div
              className="text"
              onClick={() => dispatch({ type: "eventRedeem", points, id })}
            >
              <p>Redeem Now</p> <div className="money"></div>{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
