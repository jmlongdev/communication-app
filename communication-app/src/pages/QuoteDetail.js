import { Fragment, useEffect, useContext } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import AuthContext from "../store/auth-context";

const QuoteDetail = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const match = useRouteMatch();
  const { quoteId } = useParams();
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  // console.log(match);

  if (status === "pending") {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  if (status === "error") {
    return <p>{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No quote found</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          {isLoggedIn && (
            <Link className={"btn--flat"} to={`${match.url}comments`}>
              Load comments
            </Link>
          )}
        </div>
      </Route>

      {isLoggedIn && (
        <Route path={`${match.path}/comments`}>
          <Comments />
        </Route>
      )}
    </Fragment>
  );
};

export default QuoteDetail;
