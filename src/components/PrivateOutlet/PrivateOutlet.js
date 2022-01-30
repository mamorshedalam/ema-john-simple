import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

const PrivateOutlet = () => {
     const [loggedInUser, setLoggedInUser] = useContext(UserContext);
     const location = useLocation();
     return (
          <div>
               {
                    loggedInUser.email ? <Outlet /> : <Navigate to="/login" replace="true" state={{ from: location }} />
               }
          </div>
     );
};

export default PrivateOutlet;