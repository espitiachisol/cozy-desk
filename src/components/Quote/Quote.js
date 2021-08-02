import React from "react";
import "./Quote.css";
const Quote = ({ quote }) => {
  return (
    <div className="quote-con-all">
      <div className="quote-con">
        <p className="quote-content">{quote.content}</p>
        <p className="quote-author">- {quote.author}</p>
      </div>
      <div className="quote-symbol up">&ldquo;</div>
      <div className="quote-symbol down">&rdquo;</div>
      <div className="quote-title">Quote</div>
    </div>
  );
};
export default Quote;
