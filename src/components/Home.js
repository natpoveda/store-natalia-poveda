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
  const { products, setProducts } = useContext(ProductsContext);
  let [select, setSelect] = useState("All");

  let [page, setPage] = useState(1);
  let count = 0;
  let points = 0;
  let _DATA = null;
  const PER_PAGE = 16;

  if (products != null) {
    count = Math.ceil(products.length / PER_PAGE);
  }

  if (user != null) {
    points = user.points;
  }
  _DATA = usePagination(products, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const estadoItems = { changed: 0, products };
  const [state, dispatch] = useReducer(producsreducer, estadoItems);

  const toggle = () => {
    if (state != null) {
      setProducts(state.products);
    }
  };

  useEffect(() => {
    toggle();
  }, [state]);

  const handleSelect = (e) => {
    const valCategory = e.target.value;
    setSelect(valCategory);
    dispatch({ type: "orderByCategory", products, valCategory });
  };

  return (
    <div className="history products">
      <div className="white-form">
        <div className="custom-form">
          <button
            className="btn active"
            onClick={() => dispatch({ type: "orderByCost", products })}
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
              Todas las categorias
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
