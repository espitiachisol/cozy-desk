import React from 'react';
import './RotateArrow.css';

const RotateArrow = ({ toggle }) => (
  <div
    className="rotate-arrow"
    style={{
      transform: `${toggle ? 'rotate(180deg)' : 'rotate(0deg)'}`,
    }}
  />
);
export default RotateArrow;
