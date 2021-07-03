import React from "react";
import Day from "./Day";
import { auth } from "../../firebaseConfig";

import "./Header.css";

const Header = ({ userState, setUserstate, setShowWindow, showWindow }) => {
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
          <p>COZYDESK</p>

          {auth.currentUser ? (
            <button onClick={userSignout} className="item pointer">
              {auth.currentUser.email}--- Sign out
            </button>
          ) : (
            <button
              className="item pointer"
              onClick={() =>
                setShowWindow({ ...showWindow, SignWindow: { display: true } })
              }
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
