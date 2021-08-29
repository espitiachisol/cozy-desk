import React from "react";
import "./SquareIconBtn.css";
const SquareIconBtn = React.memo(function ({
  ClickSquareIconBtn,
  imageSrc,
  imageAlt,
  btnClassName,
}) {
  console.log("asdas");
  return (
    <button
      className={`button-style ${btnClassName}`}
      onClick={ClickSquareIconBtn}
    >
      <img src={imageSrc} alt={imageAlt} />
    </button>
  );
});
export default SquareIconBtn;
