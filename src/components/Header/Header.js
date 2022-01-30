import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';
import classes from "./Header.css";

const Header = () => {
     const [loggedInUser, setLoggedInUser] = useContext(UserContext);
     // SIGN IN BUTTON HANDLER
     const navigate = useNavigate();
     const handleSignInBtn = () => {
          navigate('/shipment');
     }
     return (
          <div className="header">
               <Link to="/"><img src={logo} alt="logo" /></Link>
               <nav className="nav">
                    <h3>{loggedInUser.name}{loggedInUser.displayName}</h3>
                    <NavLink to="/shop" className={(navInfo) => (navInfo.isActive ? classes.navActive : "")}>Shop</NavLink>
                    <NavLink to="/review" className={(navInfo) => (navInfo.isActive ? classes.navActive : "")}>Review</NavLink>
                    <NavLink to="/inventory" className={(navInfo) => (navInfo.isActive ? classes.navActive : "")}>Manage Inventory</NavLink>
                    {
                         loggedInUser.success ? <button onClick={() => setLoggedInUser({})}>Sign out</button> : <button onClick={handleSignInBtn}>Sign in</button>
                    }
               </nav>
          </div>
     );
};

export default Header;