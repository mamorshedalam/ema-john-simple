import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
     return (
          <div className="header">
               <a href="/"><img src={logo} alt="logo" /></a>
               <nav className="nav">
                    <a href="/shop">Shop</a>
                    <a href="/review">Review</a>
                    <a href="/inventory">Manage Inventory</a>
               </nav>
          </div>
     );
};

export default Header;