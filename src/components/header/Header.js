import React, { useState } from "react";
import CurrentTime from "./CurrentTime";
import { auth } from "../../firebaseConfig";
import RotateArrow from "../shared/RotateArrow/RotateArrow";
import "./Header.css";

const Header = ({
  setUserstate,
  setShowWindow,
  showWindow,
  zIndex,
  setZIndex,
  setNotification,
}) => {
  const [showHeaderDropDown, setShowHeaderDropDown] = useState(false);
  const userSignout = () => {
    auth
      .signOut()
      .then(() => {
        setUserstate("");
        setNotification({
          title: "Notification",
          content: "Sign out successfully",
        });
      })
      .catch((error) => {
        setNotification({
          title: error?.code,
          content: error?.message,
        });
      });
  };
  return (
    <div className="header">
      <div className="header-content">
        <div className="left-item">
          <div
            className="logo"
            onClick={() => {
              setShowHeaderDropDown(!showHeaderDropDown);
            }}
          >
            <img
              src="/icon_favicon.svg"
              alt="CozyDesk Logo"
              className="logo-icon"
            />
            <p>CozyDesk</p>
            <RotateArrow toggle={showHeaderDropDown} />
          </div>

          {auth.currentUser ? (
            <button onClick={userSignout} className="item pointer">
              {auth.currentUser.email.length > 6
                ? auth.currentUser.email.slice(0, 6).padEnd(9, ".")
                : auth.currentUser.email}
              -Sign out
            </button>
          ) : (
            <button
              className="item pointer"
              onClick={() => {
                setShowWindow({
                  ...showWindow,
                  SignWindow: {
                    display: true,
                    x: showWindow.SignWindow.x,
                    y: showWindow.SignWindow.y,
                  },
                });
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
              Sign in
            </button>
          )}
        </div>
        <CurrentTime />
      </div>
      {showHeaderDropDown ? (
        <div className="header-drop-down-con">
          <div
            className="header-drop-down-each"
            onClick={() => {
              setShowWindow({
                ...showWindow,
                SignWindow: {
                  display: true,
                  x: showWindow.SignWindow.x,
                  y: showWindow.SignWindow.y,
                },
              });
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
            <p>Sign</p>
          </div>
          <div
            className="header-drop-down-each"
            onClick={() => {
              setShowWindow({
                ...showWindow,
                Tomato: {
                  display: true,
                  x: showWindow.Tomato.x,
                  y: showWindow.Tomato.y,
                },
              });
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
            <p>Tomato</p>
          </div>
          <div
            className="header-drop-down-each"
            onClick={() => {
              setShowWindow({
                ...showWindow,
                Music: {
                  display: true,
                  x: showWindow.Music.x,
                  y: showWindow.Music.y,
                },
              });
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
            <p>Mixtape</p>
          </div>
          <div
            className="header-drop-down-each"
            onClick={() => {
              setShowWindow({
                ...showWindow,
                Todo: {
                  display: true,
                  x: showWindow.Todo.x,
                  y: showWindow.Todo.y,
                },
              });
              if (zIndex.curW !== "Todo") {
                setZIndex({
                  ...zIndex,
                  Todo: zIndex.cur,
                  cur: zIndex.cur + 1,
                  curW: "Todo",
                });
              }
            }}
          >
            <p>Todo</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default Header;
