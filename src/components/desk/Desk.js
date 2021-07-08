import React, { useState, useCallback } from "react";
import WindowHeader from "../windowHeader/WindowHeader";
import useDrag from "../hooks/useDrag";
import "./Desk.css";

const Desk = ({ setShowWindow, showWindow, zIndex, setZIndex }) => {
  const [size, setSize] = useState({});
  const [startPositon, setStartPositon] = useState({});
  const { innerHeight, innerWidth } = window;

  const curWindow = useCallback((node) => {
    if (node !== null) {
      const response = node.getBoundingClientRect();

      setStartPositon({
        x: response.x,
        y: response.y - 36,
      });
      setSize({ width: response.width, height: response.height });
    }
  }, []);

  let startingPosition = {
    x: startPositon.x,
    y: startPositon.y,
    width: size.width,
    height: size.height,
    defaultX: innerWidth / 2 - 250,
    defaultY: innerHeight / 2 - 300,
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
      <WindowHeader
        mouseDown={mouseDown}
        setShowWindow={setShowWindow}
        showWindow={showWindow}
        label="Desk"
      />

      <div className="desk-welcome-img-con window-body">
        <img
          className="desk-welcome-img"
          src="/images/desk-s-low.jpg"
          alt="desk"
        />
        <h1 className="welcome-text">
          Welcome
          <br />
          CozyDesk
        </h1>
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
        <div
          className="list-icon"
          onDoubleClick={() => {
            setShowWindow({ ...showWindow, Music: { display: true } });
            if (zIndex.curW !== "Music") {
              setZIndex({
                ...zIndex,
                Music: zIndex.cur,
                cur: zIndex.cur + 1,
                curW: "Music",
              });
            }
          }}
        >
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
