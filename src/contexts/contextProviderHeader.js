import React, {useState, useEffect} from 'react';

export const HeaderContext = React.createContext();

//let s_obj = new String(" eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ4MjE0Yjc0MjM1MjAwMWVkOTA5OTIiLCJpYXQiOjE1OTg1NjI2MzV9.2HuMRmZHgJRgUETrIXAli97SnBBy_IU_8fKFT4TmE3Q");
let s_obj = new String(" eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWRkOWU5OTQ0NGZlNDAwNmRhOTkyNGQiLCJpYXQiOjE1OTE1ODIzNjF9.-f40dyUIGFsBSB_PTeBGdSLI58I21-QBJNi9wkODcKk");
const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer" + s_obj
}

export default function HeaderProvider({children}){
    const [user, setUser] = useState(null);
    let user_response= null;
    
    useEffect(() => {
     fetch("https://coding-challenge-api.aerolab.co/user/me",{
        method: "GET",
        headers
      })
    .then((response)=>{
        if (!response.ok){
            throw Error(response.statusText);
        }
       console.log("response",response);
        return response;
    })
    .then((response) => response.json())
    .then((user)=>setUser(user));
    },[]);
 
    
    return (
        <HeaderContext.Provider value={{user,setUser}}>
            {children}
        </HeaderContext.Provider>
    );
}