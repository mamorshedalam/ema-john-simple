import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
     const { productKey } = useParams();

     const [products, setProducts] = useState([]);
     const SingleProduct = products.find(pd => pd.key === productKey);

     useEffect(() => {
          fetch('/products.JSON')
               .then(res => res.json())
               .then(data => setProducts(data))
     }, [productKey]);

     // console.log(product);
     return (
          <React.Fragment>
               <h1 style={{textAlign: "center"}}>Your Product</h1>
               {
                    SingleProduct && (<Product showAddToCart={false} product={SingleProduct}></Product>)
               }
          </React.Fragment>
     );
};

export default ProductDetail;