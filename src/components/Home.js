import React, { useState, useContext, useReducer,useEffect } from "react";
import { HeaderContext } from "../contexts/contextProviderHeader";
import { ProductsContext } from "../contexts/contextProviderProducts";
import Item from "./Item";
import { Box } from "@chakra-ui/core";
import { Pagination } from "@material-ui/lab";
import usePagination from "./Pagination";
import Modal from './Modal';
import Filters from  './Filters';
import producsreducer from "../reducers/productsReducer";


const Home = () => {
    const { user, setUser } = useContext(HeaderContext);
    const { products, setProducts} = useContext(ProductsContext);
   
    let [page, setPage] = useState(1);
    let count = 0;
    let points = 0;
    let _DATA = null;
    const PER_PAGE = 16;

    if (products != null){
        console.log("productsHome",products);
        count = Math.ceil(products.length / PER_PAGE);   
    }

    if (user != null){
        points = user.points;
    }
    _DATA = usePagination(products, PER_PAGE);
 
    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };
  
    const estadoItems = { changed: 0, products};
    const [state, dispatch] = useReducer(producsreducer, estadoItems);
   
     const toggle =() => {
       if (state != null){
           setProducts(state.products); 
       }  
      };
     
     useEffect(() => {
         toggle();
     },[state]);
    
    return ( 
        <div className="history products">
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

            
            {
            <Box p="5">

            <div className="containerCards">
              {_DATA.currentData().map((item) => {
            
                      return (
                          <Item
                          urlImages={item.img.url}
                          category={item.category}
                          name= {item.name}
                          date= {item.createDate}
                          cost = {item.cost}
                          points = {points}
                          redeem = {1}
                          id = {item._id}
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

           <Modal />
             
         </div>
        
    );
}


export default Home;