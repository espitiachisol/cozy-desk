import React, { useState, useCallback } from "react";
import Sign from "./Sign";
import useDrag from "../hooks/useDrag";
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
    defaultX: 50,
    defaultY: 50,
  };
  const [position, mouseDown] = useDrag(startingPosition);
  return (
    <div
      className="window sign-window"
      ref={curWindow}
      style={{ top: position.y, left: position.x, zIndex: zIndex.SignWindow }}
      onClick={() => {
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
      <div className="window-header" id="sign" onMouseDown={mouseDown}>
        <i
          className="close-window pointer"
          onClick={() => {
            console.log(setShowWindow);
            setShowWindow({ ...showWindow, SignWindow: { display: false } });
          }}
        >
          &times;
        </i>
        <div className="window-header-text">
          {SignInShow ? <p>Log in</p> : <p>Sign up</p>}
        </div>
      </div>
      <div className="window-body">
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
  );
};

export default SignWindow;
