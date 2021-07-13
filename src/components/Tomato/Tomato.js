import "./Tomato.css";
import React, { useState, useCallback } from "react";
import useDrag from "../hooks/useDrag";
import WindowHeader from "../windowHeader/WindowHeader";
const setting = {
  target: [8, 10, 12, 15],
  session: [20, 25, 30, 35, 40, 45, 50, 55, 60],
  break: [5, 10, 15, 20],
};
const Tomato = ({ setShowWindow, showWindow, zIndex, setZIndex }) => {
  const [size, setSize] = useState({});
  const [startPositon, setStartPositon] = useState({});
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
    defaultX: 700,
    defaultY: 0,
  };
  const [position, mouseDown] = useDrag(startingPosition);

  return (
    <div
      className="tomato window"
      ref={curWindow}
      style={{ top: position.y, left: position.x, zIndex: zIndex.Tomato }}
      onClick={() => {
        if (zIndex.curW !== "Tomato") {
          setZIndex({
            ...zIndex,
            Tomato: zIndex.cur,
            cur: zIndex.cur + 1,
            curW: "Tomato",
          });
        }
      }}
    >
      <WindowHeader
        mouseDown={mouseDown}
        setShowWindow={setShowWindow}
        showWindow={showWindow}
        label="TOMATO"
      />
      <div className="tomato-container-all">
        <div className="tomato-container">
          <div className="tomato-outline">
            <div className="tomato-pieces"></div>
            <img
              src="/images/clock_12.png"
              alt="clock-label"
              className="tomato-clock-label"
            />
            <img
              src="/images/clock_hand.png"
              alt="clock-hand"
              className="tomato-clock-hand"
            />
          </div>
        </div>
        <div className="content-container">
          <div className="tomato-time">
            <h2 className="tomato-counter"> 24:23</h2>
            <button className="tomato-play-icon">
              <img src="/images/px-02.png" alt="play-icon" />
            </button>
          </div>
          <div className="tomato-btn-con">
            <button>
              Music list <span>&#9660;</span>
            </button>
          </div>
          <div className="tomato-setting-container">
            <p>target</p>
            <div class="select-wrapper">
              <select>
                <option>8</option>
                <option>10</option>
                <option>12</option>
                <option>15</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Tomato;
