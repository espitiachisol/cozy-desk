import React from "react";
import Day from "./Day";
import { auth } from "../../firebaseConfig";

import "./Header.css";

const Header = ({
  userState,
  setUserstate,
  setShowWindow,
  showWindow,
  zIndex,
  setZIndex,
}) => {
  const userSignout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("Sign-out successful.");
        setUserstate("");
        // setShowWindow({
        //   SignWindow: {
        //     display: true,
        //     x: "",
        //     y: "",
        //   },
        //   Tomato: {
        //     display: false,
        //     x: "",
        //     y: "",
        //   },
        //   Music: {
        //     display: false,
        //     x: "",
        //     y: "",
        //   },
        //   Todo: { display: false, x: "", y: "" },
        // });
      })
      .catch((error) => {
        console.log("An error happened.");
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
            CozyDesk
          </p>

          {auth.currentUser ? (
            <button onClick={userSignout} className="item pointer">
              {auth.currentUser.email.length > 10
                ? auth.currentUser.email.slice(0, 10).padEnd(13, ".") +
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
