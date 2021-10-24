import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
const Sign = ({ setUserstate, SignInShow, setSignInShow, setNotification }) => {
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const userSubmit = (e) => {
    e.preventDefault();
    if (SignInShow) {
      auth
        .signInWithEmailAndPassword(userMail, userPassword)
        .then((userCredential) => {
          const user = userCredential.user;
          // console.log("---response--logn-in", user.uid);
          if (SignInShow) {
            setUserstate(user.uid);
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
    <div className="sign-con">
      <h3 className="sign-title">
        {SignInShow ? "Yo! Login in here" : "hey you! Sign up now!"}
      </h3>
      <form onSubmit={userSubmit} className="sign-form">
        <input
          className="sign-input"
          placeholder="mail"
          type="text"
          name="mail"
          onChange={(e) => {
            setUserMail(e.target.value);
          }}
        />
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
              Doesn't have an account?&nbsp;
              <button
                className="pointer"
                type="button"
                onClick={() => {
                  setSignInShow(!SignInShow);
                }}
              >
                Signup
              </button>
            </p>
          ) : (
            <p>
              Already have an acoount?&nbsp;
              <button
                className="pointer"
                type="button"
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
    </div>
  );
};
export default Sign;
