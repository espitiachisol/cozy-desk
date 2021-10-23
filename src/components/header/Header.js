import React from "react";
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
  showHeaderDropDown,
  setShowHeaderDropDown,
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
    </div>
  );
};
export default Header;
