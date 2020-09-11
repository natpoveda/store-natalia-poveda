import React, {useEffect, useState} from 'react'; 

export const ProductsContext = React.createContext();

//let s_obj = new String(" eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ4MjE0Yjc0MjM1MjAwMWVkOTA5OTIiLCJpYXQiOjE1OTg1NjI2MzV9.2HuMRmZHgJRgUETrIXAli97SnBBy_IU_8fKFT4TmE3Q");
let s_obj = new String(" eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWRkOWU5OTQ0NGZlNDAwNmRhOTkyNGQiLCJpYXQiOjE1OTE1ODIzNjF9.-f40dyUIGFsBSB_PTeBGdSLI58I21-QBJNi9wkODcKk");
const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer" + s_obj
}


export default function ProductsProvider({children}){
    const [products, setProducts] = useState(null);


    const metodo = async(url)=>{
        const res = await fetch(url,{
            method : "GET",
            headers
        })
        const data = await res.json();

        return data;
    }

    useEffect(()=>{
        (
            async()=>{
                setProducts(await metodo('https://coding-challenge-api.aerolab.co/products'));
            }
        )()
    },[])

    return(
        <ProductsContext.Provider value={{products, setProducts}}>
            {children}
        </ProductsContext.Provider>
    )
}

