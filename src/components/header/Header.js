import React, { useState } from "react";
import CurrentTime from "./CurrentTime";
import { auth } from "../../firebaseConfig";
import RotateArrow from "../shared/RotateArrow/RotateArrow";
import "./Header.css";

const Header = ({
  setUserState,
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
        setUserState("");
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
                  signWindow: {
                    display: true,
                    x: showWindow.signWindow.x,
                    y: showWindow.signWindow.y,
                  },
                });
                if (zIndex.curW !== "signWindow") {
                  setZIndex({
                    ...zIndex,
                    signWindow: zIndex.cur,
                    cur: zIndex.cur + 1,
                    curW: "signWindow",
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
                signWindow: {
                  display: true,
                  x: showWindow.signWindow.x,
                  y: showWindow.signWindow.y,
                },
              });
              if (zIndex.curW !== "signWindow") {
                setZIndex({
                  ...zIndex,
                  signWindow: zIndex.cur,
                  cur: zIndex.cur + 1,
                  curW: "signWindow",
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
                tomato: {
                  display: true,
                  x: showWindow.tomato.x,
                  y: showWindow.tomato.y,
                },
              });
              if (zIndex.curW !== "tomato") {
                setZIndex({
                  ...zIndex,
                  tomato: zIndex.cur,
                  cur: zIndex.cur + 1,
                  curW: "tomato",
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
                music: {
                  display: true,
                  x: showWindow.music.x,
                  y: showWindow.music.y,
                },
              });
              if (zIndex.curW !== "music") {
                setZIndex({
                  ...zIndex,
                  music: zIndex.cur,
                  cur: zIndex.cur + 1,
                  curW: "music",
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
                todo: {
                  display: true,
                  x: showWindow.todo.x,
                  y: showWindow.todo.y,
                },
              });
              if (zIndex.curW !== "todo") {
                setZIndex({
                  ...zIndex,
                  todo: zIndex.cur,
                  cur: zIndex.cur + 1,
                  curW: "todo",
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
