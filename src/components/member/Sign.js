import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
const Sign = ({
  setUserstate,
  SignInShow,
  setShowWindow,
  showWindow,
  setSignInShow,
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
          console.log("---response--Sign-in", user);
          if (SignInShow) {
            setUserstate(user.uid);
            setShowWindow({ ...showWindow, SignWindow: { display: false } });
          }
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("---response-error", errorCode, errorMessage);
          // ..
        });
    } else {
      auth
        .createUserWithEmailAndPassword(userMail, userPassword)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("---response--Sign-up", user);
          setShowWindow({ ...showWindow, SignWindow: { display: false } });
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("---response-error", errorCode, errorMessage);
          // ..
        });
    }
  };
  return (
    <>
      <div className="sign">
        <h3 className="sign-title">
          {SignInShow ? "Welcome back! Login in here" : "hey you! Sign up now!"}
        </h3>
        <form onSubmit={userSubmit} className="sign-form">
          <div>
            <label htmlFor="mail">Mail</label>
            <input
              type="text"
              name="mail"
              onChange={(e) => {
                setUserMail(e.target.value);
              }}
            />

            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
            />
          </div>
          <button type="submit" className="pointer">
            {SignInShow ? "Login in" : "Create account"}
          </button>
        </form>
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
                {" "}
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
      </div>
    </>
  );
};
export default Sign;
