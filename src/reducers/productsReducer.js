const producsreducer = (state, action) => {
  if (action.type === "eventRedeem") {
    const cost = state.cost;
    const productId = action.id;
    const points = action.points;
    let sProductState = null;
    let total = 0;

    total = points - cost;
    sProductState = { cost, points: total, active: 1, type: "success" };
    (async () => {
      let aProduct = await getPromise(productId);
      if (!aProduct) {
        sProductState = { cost, points: total, active: 1, type: "success" };
      }
    })();

    return sProductState;
  }

  if (action.type === "orderByCost") {
    const prodsOrdered = orderProductsByCost(action.products);
    console.log("PRODsORDerd", prodsOrdered);
    return { changed: 1, products: prodsOrdered };
  }

  if (action.type === "orderByCategory") {
    const prodsOrdered = orderProductsByCategory(
      action.products,
      action.valCategory
    );
    console.log("PRODsORDerd", prodsOrdered);
    return { changed: 1, products: prodsOrdered };
  }
};

async function redeemProduct(productId) {
  let data = { productId };

  const headers = {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ4MjE0Yjc0MjM1MjAwMWVkOTA5OTIiLCJpYXQiOjE1OTg1NjI2MzV9.2HuMRmZHgJRgUETrIXAli97SnBBy_IU_8fKFT4TmE3Q",
  };

  try {
    let response = await fetch(
      "https://coding-challenge-api.aerolab.co/redeem",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers,
      }
    );
    let json = await response.json();
    return json;
  } catch (err) {
    console.log("Error ==> ", err);
  }
}

async function getPromise(productId) {
  let prod_response = null;
  prod_response = await redeemProduct(productId);

  return prod_response;
}

function orderProductsByCost(products) {
  products.sort(function (a, b) {
    if (a.cost > b.cost) {
      return 1;
    }
    if (a.cost < b.cost) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  return products;
}

function orderProductsByCategory(products, category) {
  let newProducts = [];
  let allProducts = null;

  (async () => {
    allProducts = await getPromiseAllProducts();
    console.log("ALLPRODUCTS", allProducts);
  })();

  if (category !== "All" && allProducts != null) {
    console.log("No entiendo");
    let elements = products.filter(function (element) {
      let name = element.category;
      const regex = /&/;
      let nameCategory = name.replace(regex, "Y");

      if (nameCategory === category) {
        newProducts.push(element);
      }

      return newProducts;
    });
  }
}

async function getAllProducts() {
  let s_obj =
    " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ4MjE0Yjc0MjM1MjAwMWVkOTA5OTIiLCJpYXQiOjE1OTg1NjI2MzV9.2HuMRmZHgJRgUETrIXAli97SnBBy_IU_8fKFT4TmE3Q";
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer" + s_obj,
  };

  try {
    let response = await fetch(
      "https://coding-challenge-api.aerolab.co/products",
      {
        method: "GET",
        headers,
      }
    );
    let json = await response.json();
    return json;
  } catch (err) {
    console.log("Error ==> ", err);
  }
}

async function getPromiseAllProducts() {
  let prods_response = null;
  prods_response = await getAllProducts();

  return prods_response;
}

export default producsreducer;
