import React, { useContext, useState } from 'react';
import './Login.css';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import { createNewUser, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmail } from './loginManager';


function Login() {
  // CONTEST API USED
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  // STATE TO TOGGLE NEW & OLD USER
  const [newUser, setNewUser] = useState(false);
  // UPDATE USER STATE 
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false,
  });

  // USER LOGIN DATA STORE
  initializeLoginFramework();

  // FOR REDIRECT USER TO USING PAGE
  const navigate = useNavigate();
  const location = useLocation();

  // ON BLUR CONDITIONS HANDLER
  const handleBlur = (e) => {
    // e is the short form of event
    let isFieldValid = true;

    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 5;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  // GOOGLE SIGN IN HANDLER
  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      });
  }
  // SIGN OUT HANDLER
  const signOut = () => {
    handleSignOut()
      .then(res => {
        handleResponse(res, false);
      });
  }
  // SUBMIT HANDLER
  const handleSubmit = (e) => {
    // CREATE NEW USER
    if (newUser && user.email && user.password) {
      createNewUser(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        });
    }
    // SIGN IN WITH EMAIL
    if (!newUser && user.email && user.password) {
      signInWithEmail(user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        });
    }
    // preventDefault use for stop reload page
    e.preventDefault();
  }
  // RESPONSE HANDLER
  const handleResponse = (res, redirect) => {
    setUser(res);;
    setLoggedInUser(res);
    if (redirect) {
      navigate(location.state.from);
    }
  }
  return (
    <section>
      <h1>Firebase Authentication</h1>

      {
        // SIGN IN & OUT BUTTON FOR HANDLE SIGN IN & OUT
        user.isSignedIn ? <button onClick={signOut}>Log out</button> : <button onClick={googleSignIn}>Log in Google</button>
      }

      {
        // USER DATA SHOW
        user.isSignedIn && <div>
          <p> Welcome, {user.name}</p>
          <p>Your email: {user.email}</p>
          <img src={user.photo} alt="user" />
        </div>
      }

      <div>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" />
        <label htmlFor="newUser">New User sign up</label>
      </div>
      {/* SIGN IN WITH EMAIL AND PASSWORD */}
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Enter your name" required />}
        <br />
        <input type="email" name="email" onBlur={handleBlur} placeholder="Enter your email" required />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Enter your password" required />
        <br />
        <input type="submit" name="submit" value={newUser ? "Sign up" : "Sign in"} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {user.success && <p style={{ color: 'green' }}>User {newUser ? "created" : "Logged In"} successfully</p>}
    </section>
  );
}
export default Login;