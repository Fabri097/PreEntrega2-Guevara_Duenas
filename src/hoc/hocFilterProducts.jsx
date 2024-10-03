import useProducts from "../hooks/useProducts";
import { useState } from "react";
import "./hocFiltherProducts.css"

const hocFilterProducts = (Component) => {
  return function () {
    const { products } = useProducts();
    const [query, setQuery] = useState(" ");
    const [typeOrder,setTypeOrder] = useState("")
    const changeImput = (event) => {
     setQuery(event.target.value.toLowerCase())
    }

    const search = () => {
        let filterProducts = products.filter ((product) => (
         product.name.toLowerCase().includes(query)
        ))

        if (typeOrder === "minor") {
          filterProducts = filterProducts.sort((prevProduct,nextProduct) => prevProduct.price - nextProduct.price) 
        }else if (typeOrder === "mayor"){
          filterProducts = filterProducts.sort((prevProduct,nextProduct) => nextProduct.price - prevProduct.price)
        }

        return filterProducts
    }

    return (
      <div className="filther-products">
        <div className="filthers">
         <input type="text" placeholder="buscar..."onChange={changeImput}  />
         <button onClick={() => setTypeOrder ("minor")} >Menor precio</button>
         <button onClick={() => setTypeOrder ("mayor")} >Mayor precio</button>
        </div>
        <Component products={search()}/>
      </div>
    );
  };
};
export default hocFilterProducts