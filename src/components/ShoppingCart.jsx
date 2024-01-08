import React, {useState, useEffect} from 'react';

const ShoppingCart = () => {

   const [ShoppingCart, setShoppingCart] = useState({});
   const ingredientList = ["2 lök", "5 potatis"]

   useEffect(() => {
    setShoppingCart({ingredientList})
   }, []);

   let ingredientListRender = ingredientList.map((ingredient, index)=>{
    return(
        <p>
            <label>
                <input type="checkbox" />
                <span>{ingredient}</span>
            </label>
        </p>
    )
})
   return(
    <form action="#">
        {ingredientListRender}
  </form>
   )
}

export default ShoppingCart;