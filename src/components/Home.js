import React, { useState, useContext, useReducer, useEffect } from "react";
import { HeaderContext } from "../contexts/contextProviderHeader";
import { ProductsContext } from "../contexts/contextProviderProducts";
import Item from "./Item";
import { Box } from "@chakra-ui/core";
import { Pagination } from "@material-ui/lab";
import usePagination from "./Pagination";
import Modal from "./Modal";
import producsreducer from "../reducers/productsReducer";

const Home = () => {
  const { user } = useContext(HeaderContext);
  const { products } = useContext(ProductsContext);
  let [select, setSelect] = useState("All");

  let [page, setPage] = useState(1);
  let count = 0;
  let points = 0;
  let _DATA = null;
  const PER_PAGE = 16;

  console.log("PRODHOMEALL",products);
  let prodsShow = products; 
  let [productsHome, setproductsHome] = useState(prodsShow);
  
  useEffect(() => {
    console.log("PRODHOME22",products);
    if (products != null){
        setproductsHome(products);
    }  
  }, [products]);
  
  
  if (user != null) {
    points = user.points;
  }

  const estadoItems = { changed: 0, products: productsHome };
  const [state, dispatch] = useReducer(producsreducer, estadoItems);

  const toggle = () => {
    if (state != null) {
        setproductsHome(state.products);
        setSelect("All");
    }
  };

  useEffect(() => {
    toggle();
  }, [state]);

  const handleSelect = (e) => {
    let newProducts = [];  
    const valCategory = e.target.value;
    setSelect(valCategory);
    prodsShow = products; 

    if (valCategory !== "All") {
        console.log("No entiendo");
        prodsShow.filter(function (element) {
          let name = element.category;
          const regex = /&/;
          let nameCategory = name.replace(regex, "Y");
    
          if (nameCategory === valCategory) {
            newProducts.push(element);
          }
          return newProducts;         
        });
    } else {
        newProducts = prodsShow;
        setSelect("All");
    }

    setproductsHome(newProducts);
  };

  const handleReset = () =>{
    setproductsHome(prodsShow);
    setSelect("All");
  }

  if (productsHome != null) {   
    count = Math.ceil(productsHome.length / PER_PAGE);
  }

  _DATA = usePagination(productsHome, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

   return (
    <div className="history products">
      <div className="white-form">
        <div className="custom-form">
          <button
            className="btn active"
            onClick={() => dispatch({ type: "orderByCost", prodsShow:productsHome })}
          >
            By Cost
          </button>

          <select
            className="form-control form-control-sm"
            value={select}
            onChange={handleSelect}
            name="category"
          >
            <option className="bi-geo" value="All">
              Categories
            </option>
            <option value="Phones">Phones</option>
            <option value="Gaming">Gaming</option>
            <option value="Laptops">Laptops</option>
            <option value="Tablets Y E-readers">Tablets Y E-readers</option>
            <option value="Audio">Audio</option>
            <option value="Monitors Y TV">Monitors Y TV</option>
            <option value="PC Accesories">PC Accesories</option>
            <option value="Drones">Drones</option>
            <option value="Phone Accessories">Phone Accessories</option>
            <option value="Cameras">Cameras</option>
          </select>

          <button
            className="btn active"
            onClick={handleReset}
          >
           Reset
          </button>

        </div>
      </div>

      {
        <Box p="5">
          <div className="containerCards">
            {products &&
              _DATA.currentData().map((item, index) => {
                return (
                  <Item
                    urlImages={item.img.url}
                    category={item.category}
                    name={item.name}
                    date={item.createDate}
                    cost={item.cost}
                    points={points}
                    redeem={1}
                    id={item._id}
                    key={index}
                  />
                );
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
};

export default Home;
