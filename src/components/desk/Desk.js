import React, { useState, useCallback } from "react";
import useDrag from "../hooks/useDrag";
import "./Desk.css";

const Desk = ({ setShowWindow, showWindow, zIndex, setZIndex }) => {
  const [size, setSize] = useState({});
  const [startPositon, setStartPositon] = useState({});

  const curWindow = useCallback((node) => {
    if (node !== null) {
      const response = node.getBoundingClientRect();
      console.log(response);

      setStartPositon({
        x: response.x,
        y: response.y - 40,
        defaultX: (response.left + response.right) / 2,
        defaultY: (response.top + response.bottom) / 2,
      });
      setSize({ width: response.width, height: response.height });
    }
  }, []);

  // defaultX: startPositon.defaultX, 如何增加初始位置
  // defaultY: startPositon.defaultY, 如何增加初始位置

  let startingPosition = {
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
      style={{ top: position.y, left: position.x, zIndex: zIndex.Desk }}
      onClick={() => {
        if (zIndex.curW !== "Desk") {
          setZIndex({
            ...zIndex,
            Desk: zIndex.cur,
            cur: zIndex.cur + 1,
            curW: "Desk",
          });
        }
      }}
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
        <img
          className="desk-welcome-img"
          src="/images/desk-s-low.jpg"
          alt="desk"
        />
        <p className="welcome-text">
          Welcome
          <br />
          CozyDesk
        </p>
      </div>
      <div className="apps-con">
        <div className="list-icon">
          <img
            className="desk-icon"
            src="/images/icon-tomato.png"
            alt="tomato"
          />
          <p>Tomato</p>
        </div>
        <div className="list-icon">
          <img className="desk-icon" src="/images/icon-music.png" alt="music" />
          <p>Music</p>
        </div>
        <div className="list-icon">
          <img className="desk-icon" src="/images/icon-todo.png" alt="music" />
          <p>todo</p>
        </div>
      </div>
    </div>
  );
};
export default Desk;
