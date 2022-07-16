import { Switch, Route, Redirect } from "react-router-dom";

import LoadingSpinner from "./components/UI/LoadingSpinner";
import React, { Suspense, useContext } from "react";
import AuthContext from "./store/auth-context";
import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
// import AllQuotes from "./pages/AllQuotes";
import QuoteDetail from "./pages/QuoteDetail";
import NewQuote from "./pages/NewQuote";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <div>
      <Layout />
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
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
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <Redirect to="/" />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="/new-quote">
            <NewQuote />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
