import React from 'react';
import './SquareIconBtn.css';

const SquareIconBtn = React.memo(({
  ClickSquareIconBtn, imageSrc, imageAlt, btnClassName,
}) => (
  <button className={`button-style ${btnClassName}`} onClick={ClickSquareIconBtn}>
    <img src={imageSrc} alt={imageAlt} />
  </button>
));
export default SquareIconBtn;
