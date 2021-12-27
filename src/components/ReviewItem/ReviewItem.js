import React from 'react';

const ReviewItem = (props) => {
     // console.log(props);
     const { name, quantity, key, price } = props.product;
     return (
          <div >
               <h4>{name}</h4>
               <p>Quantity: {quantity}</p>
               <small>$ {price}</small>
               <br />
               <button onClick={() => props.removeProduct(key)}>Remove</button>
          </div>
     );
};

export default ReviewItem;