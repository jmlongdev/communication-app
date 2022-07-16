import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

import classes from "./AuthForm.module.css";
import AuthContext from "../../store/auth-context";

const API_KEY = "AIzaSyD3aEitOlumhsLmz-9-e31wt1o7sNgRqbs";
const SIGN_UP_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const SIGN_IN_ENDPOINT = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const [userLocalId, setUserLocalId] = useState();
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  //   // optional: add validation

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // const enteredName = nameInputRef.current.value;
    // optional: add validation

    setIsLoading(true);
    let url;

    const authUser = async (url) => {
      if (isLogin) {
        url = SIGN_IN_ENDPOINT;
      } else {
        url = SIGN_UP_ENDPOINT;
      }
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Authentication Failed");
        }
        const data = await response.json();
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString(), enteredEmail);
        // authCtx.tokenHandler(data.idToken);
        history.replace("/");
      } catch (error) {
        alert(error.message);
      }
    };

    authUser();
    const authToken = authCtx.token;
    console.log(authToken);
    const getUserId = async (id) => {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
          {
            method: "POST",
            body: JSON.stringify({
              idToken: id,
            }),
            headers: { "Content-Type": "applicaiton/json" },
          }
        );
        if (!response.ok) {
          console.log("Failed");
        }
        const data = await response.json();
        // console.log(data.users[0].localId);
        authCtx.localIdHandler(data.users[0].localId);
      } catch (error) {
        console.log(error);
      }
    };
    getUserId();
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" ref={nameInputRef} />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputRef}
            required
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending Request</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
