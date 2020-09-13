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
    })();

    return sProductState;
  }

  if (action.type === "orderByCost"){
    const prodsOrdered = orderProductsByCost(action.products);
    console.log("PRODsORDerd", prodsOrdered);
    return {changed:1 , products:prodsOrdered};
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

function orderProductsByCost(products){

  console.log("LLProducts",products);

  
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

export default producsreducer;
