import { useRef, useState, useContext } from "react";
import AuthContext from "../../store/auth-context";

import { Prompt } from "react-router-dom";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";
const QuoteForm = (props) => {
  const [isEntered, setIsEntered] = useState(false);
  const authorInputRef = useRef();
  const textInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const userId = authCtx.userId;

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({
      author: enteredAuthor,
      text: enteredText,
      userId: userId,
    });
  }

  const finishEnteredHandler = () => {
    setIsEntered(false);
  };

  const formFocusedHandler = () => {
    setIsEntered(true);
  };

  return (
    <section className={classes.main}>
      <Prompt
        when={isEntered}
        message={(location) =>
          "Are you sure you want to leave. data will be lost "
        }
      />
      <Card>
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteredHandler} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default QuoteForm;
