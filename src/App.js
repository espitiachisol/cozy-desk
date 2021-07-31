import Header from "./components/header/Header";
import MainBody from "./components/MainBody/MainBody";
import { auth, firestore } from "./firebaseConfig";

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
    SignWindow: { display: true, x: "", y: "" },
    Tomato: { display: false, x: "", y: "" },
    Music: { display: false, x: "", y: "" },
    Todo: { display: false, x: "", y: "" },
  });
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserstate(user.uid);
        firestore
          .collection("windowPosition")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              // console.log("Document data:", doc.data().showWindow);
              setShowWindow(doc.data().showWindow);
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      } else {
        console.log("not sign in");
      }
    });
  }, []);

  useEffect(() => {
    if (userState) {
      if (
        showWindow.Tomato.x ||
        showWindow.Music.x ||
        showWindow.Todo.x ||
        showWindow.SignWindow.x
      ) {
        firestore
          .collection("windowPosition")
          .doc(userState)
          .set({ showWindow: showWindow })
          .then(() => {
            console.log("Document successfully updte!!!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      }
    }
  }, [userState, showWindow]);

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
