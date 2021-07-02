import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
const Sign = ({ setUserstate, SignInShow }) => {
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
        <h3>
          {SignInShow ? "Welcome back!Login in here" : "hey you! Sign up now!"}
        </h3>
        <hr />
        <form onSubmit={userSubmit}>
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
          <button type="submit" className="pointer">
            {SignInShow ? "Login in" : "Create account"}
          </button>
        </form>
      </div>
    </>
  );
};
export default Sign;
