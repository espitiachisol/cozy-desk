import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
const Sign = ({
  setUserstate,
  SignInShow,
  setShowWindow,
  showWindow,
  setSignInShow,
  setNotification,
}) => {
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const userSubmit = (e) => {
    e.preventDefault();
    if (SignInShow) {
      auth
        .signInWithEmailAndPassword(userMail, userPassword)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log("---response--logn-in", user.uid);
          if (SignInShow) {
            setUserstate(user.uid);
            setShowWindow({
              Tomato: { display: false, x: "", y: "" },
              Music: { display: false, x: "", y: "" },
              Todo: { display: false, x: "", y: "" },
              SignWindow: {
                display: true,
                x: showWindow.SignWindow.x,
                y: showWindow.SignWindow.y,
              },
            });
            setNotification({
              title: "Notification",
              content: "Logn in successfully",
            });
          }
        })
        .catch((error) => {
          setNotification({
            title: error?.code,
            content: error?.message,
          });
          // console.log("---response-error", errorCode, errorMessage);
        });
    } else {
      auth
        .createUserWithEmailAndPassword(userMail, userPassword)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log("---response--Sign-up", user.uid);
          setUserstate(user.uid);
          setShowWindow({
            Tomato: { display: false, x: "", y: "" },
            Music: { display: false, x: "", y: "" },
            Todo: { display: false, x: "", y: "" },
            SignWindow: {
              display: true,
              x: showWindow.SignWindow.x,
              y: showWindow.SignWindow.y,
            },
          });
          setNotification({
            title: "Notification",
            content: "Sign up successfully",
          });
        })
        .catch((error) => {
          setNotification({
            title: error?.code,
            content: error?.message,
          });
          // console.log("---response-error", errorCode, errorMessage);
          // ..
        });
    }
  };
  return (
    <>
      <h3 className="sign-title">
        {SignInShow ? "Yo! Login in here" : "hey you! Sign up now!"}
      </h3>
      <form onSubmit={userSubmit} className="sign-form">
        {/* <label htmlFor="mail">Mail</label> */}
        <input
          className="sign-input"
          placeholder="mail"
          type="text"
          name="mail"
          onChange={(e) => {
            setUserMail(e.target.value);
          }}
        />

        {/* <label htmlFor="password">password</label> */}
        <input
          className="sign-input"
          placeholder="password"
          type="password"
          name="password"
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        />

        <button type="submit" className="sign-submit-btn button-style">
          {SignInShow ? "Login in" : "Create account"}
        </button>
        <div className="sign-switch-con">
          {SignInShow ? (
            <p>
              doesn't have an account&nbsp;
              <button
                className="pointer"
                onClick={() => {
                  setSignInShow(!SignInShow);
                }}
              >
                Signup
              </button>
            </p>
          ) : (
            <p>
              already have an acoount&nbsp;
              <button
                className="pointer"
                onClick={() => {
                  setSignInShow(!SignInShow);
                }}
              >
                Singin
              </button>
            </p>
          )}
        </div>
      </form>
    </>
  );
};
export default Sign;
