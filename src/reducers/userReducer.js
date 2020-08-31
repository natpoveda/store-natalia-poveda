function reducer(state, action) {
  let sForm = null;
  const { m1000, m5000, m7500 } = state;  
  if (action.type === "eventChange") {
    switch (action.id) {
      case "m1000":
        sForm = { m1000: true, m5000: false, m7500: false, disabled: false };
        break;
      case "m5000":
        sForm = { m1000: false, m5000: true, m7500: false, disabled: false };
        break;
      case "m7500":
        sForm = { m1000: false, m5000: false, m7500: true, disabled: false };
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

    getPromise(amount);

    return { m1000: false, m5000: false, m7500: false, disabled: true };
  }
}

async function addPoint(amount) {
  let data = { amount };
  let s_obj = new String(
    " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWRkOWU5OTQ0NGZlNDAwNmRhOTkyNGQiLCJpYXQiOjE1OTE1ODIzNjF9.-f40dyUIGFsBSB_PTeBGdSLI58I21-QBJNi9wkODcKk"
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
}

export default reducer;
