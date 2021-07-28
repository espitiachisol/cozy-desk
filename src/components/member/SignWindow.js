import React, { useState, useCallback } from "react";
import Sign from "./Sign";
import useDrag from "../hooks/useDrag";
import WindowHeader from "../windowHeader/WindowHeader";
import "./Sign.css";
const SignWindow = ({
  userState,
  setUserstate,
  setShowWindow,
  showWindow,
  zIndex,
  setZIndex,
}) => {
  const [size, setSize] = useState({});
  const [startPositon, setStartPositon] = useState({});
  const [SignInShow, setSignInShow] = useState(true);
  const { innerWidth } = window;
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

  const startingPosition = {
    x: startPositon.x,
    y: startPositon.y,
    width: size.width,
    height: size.height,
    defaultX: innerWidth / 2 - 350,
    defaultY: 0,
  };
  const [position, mouseDown] = useDrag(startingPosition);
  return (
    <div
      className="window sign"
      ref={curWindow}
      style={{ top: position.y, left: position.x, zIndex: zIndex.SignWindow }}
      onMouseDown={() => {
        if (zIndex.curW !== "SignWindow") {
          setZIndex({
            ...zIndex,
            SignWindow: zIndex.cur,
            cur: zIndex.cur + 1,
            curW: "SignWindow",
          });
        }
      }}
    >
      <WindowHeader
        mouseDown={mouseDown}
        setShowWindow={setShowWindow}
        showWindow={showWindow}
        label="CozyDesk"
      />
      <div className="sign-container-all">
        <div className="sign-container">
          <div className="sign-image-container">
            <img src="/images/welcome.jpg" alt="welcome"></img>
          </div>
          <div className="sign-content">
            <h2 className="sign-welcome-title">Welcome to CozyDesk</h2>
            <div className="sign-welcome-note">
              <p>with an account you can...</p>
              <p>◦ create your own desktop</p>
              <p>◦ save your todo list</p>
              <p>◦ save your playlist</p>
              <p>◦ save your setting</p>
            </div>
            <Sign
              userState={userState}
              setUserstate={setUserstate}
              SignInShow={SignInShow}
              setShowWindow={setShowWindow}
              showWindow={showWindow}
              setSignInShow={setSignInShow}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignWindow;
