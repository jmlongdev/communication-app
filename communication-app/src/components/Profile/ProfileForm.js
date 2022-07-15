import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import classes from "./ProfileForm.module.css";

const API_KEY = "AIzaSyD3aEitOlumhsLmz-9-e31wt1o7sNgRqbs";
const CHANGE_PASSWORD_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

const ProfileForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const resetPasswordRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();
    const newPassword = resetPasswordRef.current.value;

    //add validaiton

    if (isLoggedIn) {
      fetch(CHANGE_PASSWORD_URL, {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newPassword,
          returnSecureToken: false,
        }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => {
        if (res.ok) {
          history.replace("/");
        } else {
          return res.json().then((data) => {
            console.log(data.error.message);
          });
        }
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={resetPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
