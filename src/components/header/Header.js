import React, { useState } from "react";
import CurrentTime from "./HeaderItems/CurrentTime";
import HeaderDropMenu from "./HeaderItems/HeaderDropMenu";
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
  const userSignOut = () => {
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
            <button onClick={userSignOut} className="item pointer">
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
        <HeaderDropMenu
          setShowWindow={setShowWindow}
          showWindow={showWindow}
          setZIndex={setZIndex}
          zIndex={zIndex}
        />
      ) : null}
    </div>
  );
};
export default Header;
