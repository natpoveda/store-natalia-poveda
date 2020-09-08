import React, { useState, useContext, useReducer, useCallback } from "react";
import { HeaderContext } from "../contexts/contextProviderHeader";
import reducer from "../reducers/userReducer";
import RedemItem from "./RedemItem";
import { Box, List, Tag, ListItem, Divider } from "@chakra-ui/core";
import { Pagination } from "@material-ui/lab";
import usePagination from "./Pagination";


const User = () => {
  const { user, setUser } = useContext(HeaderContext);

  let points = 0;

  if (user != null) {
    points = user.points;
  }
  
  const estadoForm = {
    m1000: false,
    m5000: false,
    m7500: false,
    disabled: true,
    points,
  };

  console.log("estadoForm", estadoForm);
  const reducerMemo = useCallback(reducer, []);
  const [state, dispatch] = useReducer(reducerMemo, estadoForm);
  let [page, setPage] = useState(1);
  console.log("StateUser", state);
  const { m1000, m5000, m7500, disabled } = state;

  let redeem = null;
  let count = 0;
  let _DATA = null;
  const PER_PAGE = 24;

 if (user != null){
   console.log("Useruser",user);
     redeem = user.redeemHistory;
     console.log("Redeem",redeem);
     count = Math.ceil(redeem.length / PER_PAGE);
     
 }
 console.log("RedeemFuera",redeem);
 _DATA = usePagination(redeem, PER_PAGE);
 
 console.log("_DATA",_DATA);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

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
              onChange={() =>
                dispatch({ type: "eventChange", id: "m1000", points })
              }
            />
            <span>5000 Points</span>
            <input
              id="m5000"
              name="m5000"
              type="checkbox"
              checked={m5000}
              onChange={() =>
                dispatch({ type: "eventChange", id: "m5000", points })
              }
            />
            <span>7500 Points</span>
            <input
              id="m7500"
              name="m7500"
              type="checkbox"
              checked={m7500}
              onChange={() =>
                dispatch({ type: "eventChange", id: "m7500", points })
              }
            />

            <button
              disabled={disabled}
              className={`btn ${disabled ? "disabled" : ""}`}
              onClick={() => dispatch({ type: "handleChangePoints", points })}
            >
              Add Points
            </button>
          </form>

          <div className="history products">
            {
            <Box p="5">

            <div className="containerCards">
              {_DATA.currentData().map((item) => {
                console.log("Item",item);
                      return (
                          <RedemItem
                          urlImages={item.img.url}
                          category={item.category}
                          name= {item.name}
                          date= {item.createDate}
                          cost = {item.cost}
                          />
                      )
                      
                  })}
            </div> 
            
            <Pagination
              count={count}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />  
            </Box>  
              }
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
