import React, { useState, useContext, useReducer } from "react";
import { HeaderContext } from "../contexts/contextProviderHeader";
import { ProductsContext } from "../contexts/contextProviderProducts";
import reducer from "../reducers/userReducer";
import Item from "./Item";
import { Box, List, Tag, ListItem, Divider } from "@chakra-ui/core";
import { Pagination } from "@material-ui/lab";
import usePagination from "./Pagination";


const Home = () => {
    const { user, setUser } = useContext(HeaderContext);
    const { products, setProducts} = useContext(ProductsContext);
    let [page, setPage] = useState(1);

    let count = 0;
    let _DATA = null;
    const PER_PAGE = 16;

    if (products != null){
        count = Math.ceil(products.length / PER_PAGE);   
    }

    _DATA = usePagination(products, PER_PAGE);
 
    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };
    console.log("Products", products);
    return ( 
        <div className="history products">
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
        
    );
}


export default Home;