import Header from "./components/header/Header";
import MainBody from "./components/MainBody/MainBody";
import { auth } from "./firebaseConfig";
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [userState, setUserstate] = useState("");
  const [showWindow, setShowWindow] = useState({
    SignWindow: { display: false },
    Desk: { display: true },
  });
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        setUserstate(uid);
      } else {
        console.log("not sign in");
      }
    });
  }, []);

  return (
    <>
      <Header
        userState={userState}
        setUserstate={setUserstate}
        setShowWindow={setShowWindow}
        showWindow={showWindow}
      />
      <MainBody
        userState={userState}
        setUserstate={setUserstate}
        setShowWindow={setShowWindow}
        showWindow={showWindow}
      />
    </>
  );
}

export default App;
