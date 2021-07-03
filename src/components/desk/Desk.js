import React, { useState, useCallback } from "react";
import useDrag from "../hooks/useDrag";
import "./Desk.css";

const Desk = ({ setShowWindow, showWindow }) => {
  const [size, setSize] = useState({});
  const [startPositon, setStartPositon] = useState({});

  const curWindow = useCallback((node) => {
    if (node !== null) {
      const response = node.getBoundingClientRect();
      console.log(response);
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
        <img className="desk-welcome-img" src="/desk-s-low.jpg" alt="desk" />
        <p className="welcome-text">
          Welcome
          <br />
          CozyDesk
        </p>
      </div>
      <div className="apps-con">
        <div className="list-icon">
          <img className="desk-icon" src="/icon-tomato.png" alt="tomato" />
          <p>Tomato</p>
        </div>
        <div className="list-icon">
          <img className="desk-icon" src="/icon-music.png" alt="music" />
          <p>Music</p>
        </div>
        <div className="list-icon">
          <img className="desk-icon" src="/icon-todo.png" alt="music" />
          <p>todo</p>
        </div>
      </div>
    </div>
  );
};
export default Desk;
