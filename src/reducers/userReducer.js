
const reducer = (state, action) =>{
    
  let sForm = null;
  const { m1000, m5000, m7500 } = state;  
  let points= action.points;

  if (action.type === "eventChange") {

    switch (action.id) {
      case "m1000":
        sForm = { m1000: true, m5000: false, m7500: false, disabled: false, points };
        break;
      case "m5000":
        sForm = { m1000: false, m5000: true, m7500: false, disabled: false, points };
        break;
      case "m7500":
        sForm = { m1000: false, m5000: false, m7500: true, disabled: false, points };
        break;
    }

    return sForm;
  }

  if (action.type === "handleChangePoints") {
    
    console.log("HandleChangePoints");
    let amount = 0;
    if (m1000) {
      amount = 1000;
    } else if (m5000) {
      amount = 5000;
    } else if (m7500) {
      amount = 7500;
    }

    const totalPoints = points + amount;
    let newState = { m1000: false, m5000: false, m7500: false, disabled: true, points:totalPoints };
    (
      async ()=>{
        let aAmount = await getPromise(amount);
        if (aAmount.message ==="Points Updated") {
           points = aAmount['New Points'];
           newState = { m1000: false, m5000: false, m7500: false, disabled: true, points };
        }
      }
    )()
    

    return newState;
  }

}

async function addPoint(amount) {
  let data = { amount };
  let s_obj = new String(
    " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ4MjE0Yjc0MjM1MjAwMWVkOTA5OTIiLCJpYXQiOjE1OTg1NjI2MzV9.2HuMRmZHgJRgUETrIXAli97SnBBy_IU_8fKFT4TmE3Q"
  );
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer" + s_obj,
  };

  try {
    let response = await fetch(
      "https://coding-challenge-api.aerolab.co/user/points",
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

async function getPromise(amount) {
  let user_response = null;
  user_response = await addPoint(amount);
  
  return user_response;

}


export default reducer;
