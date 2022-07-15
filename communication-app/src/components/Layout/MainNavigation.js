import { useContext } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const history = useHistory;
  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    console.log("logout");
    authCtx.logout();
    history.replace("/auth");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={classes.active} to="/quotes">
              All Quotes
            </NavLink>
          </li>
          {isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/new-quote">
                Add Quote
              </NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to="auth">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
