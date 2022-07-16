import StartingPage from "../components/StartingPage/StartingPage";
import { useEffect, useContext } from "react";

import QuoteList from "../components/quotes/QuoteList";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

import AuthContext from "../store/auth-context";

const HomePage = () => {
  const authCtx = useContext(AuthContext);
  const userId = authCtx.localId;
  // console.log(userId);
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  // console.log(loadedQuotes.map((quote) => quote.userId));

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }
  return (
    <div>
      <StartingPage />
      <QuoteList quotes={loadedQuotes} />
    </div>
  );
};

export default HomePage;
