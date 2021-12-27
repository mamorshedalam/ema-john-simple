import React, { useEffect } from 'react';
import { useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import fakeData from '../../fakeData';
import { Link } from 'react-router-dom';

const Shop = () => {
     const [inputData, setInputData] = useState([]);
     useEffect(() => {
          fetch('products.JSON')
               .then(res => res.json())
               .then(data => setInputData(data))
     }, []);

     const [cart, setCart] = useState([]);

     useEffect(() => {
          const savedCart = getStoredCart();
          const productKeys = Object.keys(savedCart);

          const previousCart = productKeys.map(existingKey => {
               const product = fakeData.find(pd => pd.key === existingKey);
               product.quantity = savedCart[existingKey];
               return product;
          })
          setCart(previousCart);
     }, [])
     const handleAddProduct = (product) => {
          const sameProduct = cart.find(pd => pd.key === product.key);
          let count = 1;
          let newCart;
          if (sameProduct) {
               const count = sameProduct.quantity + 1;
               sameProduct.quantity = count;
               const others = cart.filter(pd => pd.key !== product.key);
               newCart = [...others, sameProduct];
          }
          else {
               product.quantity = 1;
               newCart = [...cart, product];
          }

          setCart(newCart);

          addToDb(product.key, count);
     }
     return (
          <div className="shop-container">
               <div className="product-section">
                    {
                         inputData.map(products => <Product
                              key={products.key}
                              showAddToCart={true}
                              handleAddProduct={handleAddProduct}
                              product={products}>
                         </Product>)
                    }
               </div>
               <div className="cart-container">
                    <Cart cart={cart}>
                         <Link to="/review"><button>Review your order</button></Link>
                    </Cart>
               </div>
          </div>
     );
};

export default Shop;