import React, { useState, useCallback } from "react";
import useDrag from "../hooks/useDrag";
import "./Desk.css";

const Desk = (setShowWindow, showWindow) => {
  const [size, setSize] = useState({});
  const [startPositon, setStartPositon] = useState({});

  const curWindow = useCallback((node) => {
    if (node !== null) {
      const response = node.getBoundingClientRect();
      setStartPositon({
        x: response.x,
        y: response.y - 40,
      });
      setSize({ width: response.width, height: response.height });
    }
  }, []);

  const startingPosition = {
    x: startPositon.x,
    y: startPositon.y,
    width: size.width,
    height: size.height,
  };

  const [position, mouseDown] = useDrag(startingPosition);
  return (
    <div
      className="desk window"
      ref={curWindow}
      style={{ top: position.y, left: position.x }}
    >
      <div className="window-header" id="desk" onMouseDown={mouseDown}>
        <i
          className="close-window pointer"
          onClick={() => {
            setShowWindow({ ...showWindow, Desk: { display: false } });
          }}
        >
          &times;
        </i>
      </div>
      <div className="desk-welcome-img-con window-body">
        <img className="desk-welcome-img" src="/desk-s.jpg" alt="desk" />
        <p className="welcome-text">Welcome</p>
      </div>
      <div className="apps-con">
        <div className="app">Tomato</div>
        <div className="app">Music</div>
        <div className="app">todo</div>
      </div>
    </div>
  );
};
export default Desk;
