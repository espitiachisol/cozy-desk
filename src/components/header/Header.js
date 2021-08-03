import React from "react";
import Day from "./Day";
import { auth } from "../../firebaseConfig";

import "./Header.css";

const Header = ({
  setUserstate,
  setShowWindow,
  showWindow,
  zIndex,
  setZIndex,
  setNotification,
}) => {
  const userSignout = () => {
    auth
      .signOut()
      .then(() => {
        // console.log("Sign-out successful.");
        setUserstate("");
        setShowWindow({
          SignWindow: { display: true, x: "", y: "" },
          Tomato: { display: false, x: "", y: "" },
          Music: { display: false, x: "", y: "" },
          Todo: { display: false, x: "", y: "" },
        });
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
          <p
            className="logo"
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
            <img
              src="/icon_favicon.svg"
              alt="CozyDesk Logo"
              className="logo-icon"
            />{" "}
            CozyDesk
          </p>

          {auth.currentUser ? (
            <button onClick={userSignout} className="item pointer">
              {auth.currentUser.email.length > 8
                ? auth.currentUser.email.slice(0, 8).padEnd(11, ".") +
                  auth.currentUser.email.slice(
                    auth.currentUser.email.length - 3,
                    auth.currentUser.email.length
                  )
                : auth.currentUser.email}
              - Sign out
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
        <Day />
      </div>
    </div>
  );
};
export default Header;
