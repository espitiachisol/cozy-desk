import React, { useState, useCallback } from 'react';
import Sign from './Sign';
import useDrag from '../hooks/useDrag';
import WindowHeader from '../shared/WindowHeader/WindowHeader';
import './Sign.css';
import Quote from '../Quote/Quote';

const SignWindow = ({
  userState,
  setUserState,
  setShowWindow,
  showWindow,
  zIndex,
  setZIndex,
  setNotification,
  quote,
}) => {
  const [size, setSize] = useState({});
  const [startPosition, setStartPosition] = useState({});
  const [SignInShow, setSignInShow] = useState(true);
  const { innerWidth } = window;

  const curWindow = useCallback((node) => {
    if (node === null) return;
    const response = node.getBoundingClientRect();
    setStartPosition({
      x: response.x,
      y: response.y - 32,
    });
    setSize({ width: response.width, height: response.height });
  }, []);

  const [position, mouseDown] = useDrag({
    x: startPosition.x,
    y: startPosition.y,
    width: size.width,
    height: size.height,
    defaultX: parseInt(showWindow.signWindow.x, 10) || innerWidth / 2 - 350,
    defaultY: parseInt(showWindow.signWindow.y, 10) || 0,
  });

  return (
    <div
      className="window sign"
      ref={curWindow}
      style={{ top: position.y, left: position.x, zIndex: zIndex.signWindow }}
      onMouseDown={() => {
        if (zIndex.curW !== 'signWindow') {
          setZIndex({
            ...zIndex,
            signWindow: zIndex.cur,
            cur: zIndex.cur + 1,
            curW: 'signWindow',
          });
        }
      }}
    >
      <WindowHeader
        mouseDown={mouseDown}
        setShowWindow={setShowWindow}
        showWindow={showWindow}
        position={position}
        label="CozyDesk"
      />
      <div className="sign-container-all">
        <div className="sign-container">
          <div className="sign-image-container">
            <img src="/images/welcome.jpg" alt="welcome" />
            {quote?.content ? <Quote quote={quote} /> : null}
          </div>
          <div className="sign-content">
            <div className="sign-welcome-con">
              <h2 className="sign-welcome-title">Welcome to CozyDesk</h2>
              <div className="sign-welcome-note">
                <p>with an account you can...</p>
                <p>◦ Save your to-do</p>
                <p>◦ Create your own playlist</p>
                <p>◦ Save your tomato timer </p>
                <p>◦ Inspirational quotes</p>
                {/* <p>
                CozyDesk is the website version of the computer desktop. It
                currently provides three main tools to help users create a
                working environment. They are the Pomodoro, to-do and music
                player.
              </p> */}
              </div>
            </div>
            {!userState ? (
              <Sign
                userState={userState}
                setUserState={setUserState}
                SignInShow={SignInShow}
                setSignInShow={setSignInShow}
                setNotification={setNotification}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignWindow;
