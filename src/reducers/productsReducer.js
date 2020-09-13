const producsreducer = (state, action)=>{

    const {cost,points}=state;
    if (action.type === "eventRedeem") {
      const productId = action.id;
      let sProductState = null;
      let total = 0;
      (
        async ()=>{
          let abc = await getPromise(productId);
          /*if (abc.message ==="Points Updated") {
             points = abc['New Points'];
          }*/
          
        }
      )()
      total = points-cost;
      sProductState = {cost, points:total, active: 1, type: "success"};  
      return sProductState;
    }

}


async function redeemProduct(productId) {
    let data = { productId };
    console.log("data",data);
    let s_obj = new String(" eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ4MjE0Yjc0MjM1MjAwMWVkOTA5OTIiLCJpYXQiOjE1OTg1NjI2MzV9.2HuMRmZHgJRgUETrIXAli97SnBBy_IU_8fKFT4TmE3Q");
    const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ4MjE0Yjc0MjM1MjAwMWVkOTA5OTIiLCJpYXQiOjE1OTg1NjI2MzV9.2HuMRmZHgJRgUETrIXAli97SnBBy_IU_8fKFT4TmE3Q"
    }
  
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
  

export default producsreducer;