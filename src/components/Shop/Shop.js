import React, { useEffect } from 'react';
import { useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
     const [inputData, setInputData] = useState([]);
     useEffect(()=>{
          fetch('products.JSON')
          .then(res => res.json())
          .then(data => setInputData(data))
     }, []);
 
     const [cart, setCart] = useState([]);
     const handleAddProduct = (product) =>{
          const newCart = [...cart, product];
          setCart(newCart);
     }
     return (
          <div className="shop-container">
               <div className="product-section">
                    {
                         inputData.map(products => <Product handleAddProduct={handleAddProduct} product={products}></Product>)
                    }
               </div>
               <div className="cart-container">
                    <Cart cart={cart}></Cart>
               </div>
          </div>
     );
};

export default Shop;