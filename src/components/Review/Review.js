import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getStoredCart, deleteFromDb, clearTheCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';

const Review = () => {
     const [cart, setCart] = useState([]);
     const [orderPlaced, setOrderPlaced] = useState(false);

     const handlePlaceOrder = () => {
          setCart([]);
          setOrderPlaced(true);
          clearTheCart();
     }

     const removeProduct = (productKey) => {
          // console.log(productKey);
          const newCart = cart.filter(pd => pd.key !== productKey);
          setCart(newCart);
          deleteFromDb(productKey);
     }

     useEffect(() => {
          const savedCart = getStoredCart();
          const productKeys = Object.keys(savedCart);

          const cartProducts = productKeys.map(key => {
               const product = fakeData.find(pd => pd.key === key);
               product.quantity = savedCart[key];
               return product;
          });
          setCart(cartProducts);
     }, []);

     let thankYou;
     if (orderPlaced) {
          thankYou = <img src={happyImage} alt="" />
     }
     return (
          <div className="shop-container">
               <div className="product-section">
                    <h1>Order review: {cart.length}</h1>
                    {
                         cart.map(pd => <ReviewItem key={pd.key} product={pd} removeProduct={removeProduct}></ReviewItem>)
                    }
               </div>
               {thankYou}
               <div className="cart-container">
                    <Cart cart={cart}>
                         <button onClick={handlePlaceOrder}>Place Order</button>
                    </Cart>
               </div>
          </div>
     );
};

export default Review;