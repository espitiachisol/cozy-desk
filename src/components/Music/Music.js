import React, { useState, useCallback } from "react";
import useDrag from "../hooks/useDrag";
import "./Music.css";

const Music = ({ setShowWindow, showWindow, zIndex, setZIndex }) => {
  const [size, setSize] = useState({});
  const [startPositon, setStartPositon] = useState({});
  const { innerHeight, innerWidth } = window;

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

  let startingPosition = {
    x: startPositon.x,
    y: startPositon.y,
    width: size.width,
    height: size.height,
    defaultX: 50,
    defaultY: 350,
  };

  const [position, mouseDown] = useDrag(startingPosition);
  return (
    <div
      className="music window"
      ref={curWindow}
      style={{ top: position.y, left: position.x, zIndex: zIndex.Music }}
      onClick={() => {
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
      <div className="window-header" id="music" onMouseDown={mouseDown}>
        <i
          className="close-window pointer"
          onClick={() => {
            setShowWindow({ ...showWindow, Music: { display: false } });
          }}
        >
          &times;
        </i>
        <div className="window-header-text">Music</div>
      </div>
    </div>
  );
};
export default Music;
