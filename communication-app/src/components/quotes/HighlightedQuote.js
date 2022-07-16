import classes from "./HighlightedQuote.module.css";

const HighlightedQuote = (props) => {
  return (
    <section className={classes.main}>
      <figure className={classes.quote}>
        <p>{props.text}</p>
        <figcaption>{props.author}</figcaption>
      </figure>
    </section>
  );
};

export default HighlightedQuote;
