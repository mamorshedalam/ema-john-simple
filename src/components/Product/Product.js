import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStarHalfAlt, faStar, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
     // console.log(props);
     const { img, name, seller, price, stock, key } = props.product;
     return (
          <div className="product-item">
               <div className="product-img">
                    <img src={img} alt="" />
               </div>
               <div className="product-text">
                    <h2><Link to={"/product/" + key}>{name}</Link></h2>
                    <div className="product-details">
                         <div className="product-pricing">
                              <a>by: {seller}</a>
                              <h6>$ {price}</h6>
                              <p>only {stock} in stock - order soon</p>
                              {
                                   props.showAddToCart && <button onClick={() => props.handleAddProduct(props.product)}>
                                        <FontAwesomeIcon icon={faShoppingCart} /> add to cart
                                   </button>
                              }
                         </div>
                         <div className="product-star">
                              <div className="star">
                                   <FontAwesomeIcon icon={faStar} />
                                   <FontAwesomeIcon icon={faStar} />
                                   <FontAwesomeIcon icon={faStar} />
                                   <FontAwesomeIcon icon={faStarHalfAlt} />
                              </div>
                              <p>Features</p>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default Product;