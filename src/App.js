import Header from "./components/header/Header";
import MainBody from "./components/MainBody/MainBody";
import { auth } from "./firebaseConfig";
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [userState, setUserstate] = useState("");
  const [zIndex, setZIndex] = useState({
    SignWindow: 1,
    Desk: 1,
    Music: 1,
    Tomato: 1,
    Todo: 1,
    cur: 2,
    curW: "",
  });

  const [showWindow, setShowWindow] = useState({
    SignWindow: { display: true },
    Tomato: { display: false },
    Music: { display: false },
    Todo: { display: false },
  });
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserstate(user.uid);
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
        setZIndex={setZIndex}
        zIndex={zIndex}
      />
      <MainBody
        userState={userState}
        setUserstate={setUserstate}
        setShowWindow={setShowWindow}
        showWindow={showWindow}
        setZIndex={setZIndex}
        zIndex={zIndex}
      />
    </>
  );
}

export default App;
