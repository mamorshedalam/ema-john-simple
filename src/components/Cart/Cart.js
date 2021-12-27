import React from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart = (props) => {
     const cart = props.cart;

     const total = cart.reduce((total, product) => total + product.price * product.quantity, 0);
     // let total = 0;
     // for (let i = 0; i < cart.length; i++) {
     //      const product = cart[i];
     //      total = total + product.price;
     // }

     // Shipping Cost
     let shipping = 0;
     if (total > 150) {
          shipping = 20;
     }
     else if (total > 100) {
          shipping = 15;
     }
     else if (total > 70) {
          shipping = 12;
     }
     else if (total > 40) {
          shipping = 9;
     }
     else if (total > 25) {
          shipping = 6;
     }
     else if (total > 10) {
          shipping = 3;
     }

     // Total before with shipping
     let subTotal = total + shipping;

     // Tax
     let tax = (total / 10).toFixed(2);

     // Big Total
     const bigTotal = subTotal + tax;

     return (
          <div className="cart-section">
               <h2>Order Summary</h2>
               <p>Items ordered : {cart.length}</p>
               <table>
                    <tr>
                         <td>Shipping + Handling:</td>
                         <td>{shipping}</td>
                    </tr>
                    <tr>
                         <td>Total before tax:</td>
                         <td>{subTotal} </td>
                    </tr>
                    <tr>
                         <td>Estimated Tax:</td>
                         <td>{tax}</td>
                    </tr>
                    <tr>
                         <td>Order Total:</td>
                         <td>{bigTotal}</td>
                    </tr>
               </table>
               {
                    props.children
               }
          </div>
     );
};

export default Cart;