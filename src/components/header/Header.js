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
              setShowWindow({ ...showWindow, SignWindow: { display: true } });
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
              {auth.currentUser.email}--- Sign out
            </button>
          ) : (
            <button
              className="item pointer"
              onClick={() => {
                setShowWindow({ ...showWindow, SignWindow: { display: true } });
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
