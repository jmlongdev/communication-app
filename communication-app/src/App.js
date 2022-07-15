import { Switch, Route, Redirect } from "react-router-dom";

import { useContext } from "react";
import AuthContext from "./store/auth-context";
import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <div>
      <Layout />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/profile">
          {isLoggedIn && <ProfilePage />}
          {!isLoggedIn && <Redirect to="/auth" />}
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
