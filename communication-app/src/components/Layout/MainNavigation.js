import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./MainNavigation.module.css";
// import AuthContext from

const MainNavigation = () => {
  const logoutHandler = () => {
    console.log("logout");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="auth">Login</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
