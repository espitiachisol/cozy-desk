import Header from "./components/header/Header";
import MainBody from "./components/MainBody/MainBody";
import { auth } from "./firebaseConfig";
import React, { useState, useEffect } from "react";

import { GETFirestore, SETFirestore } from "./api/firestore.api";
import "./App.css";
function App() {
  const [userState, setUserstate] = useState("");
  const [notification, setNotification] = useState({ title: "", content: "" });
  const [zIndex, setZIndex] = useState({
    SignWindow: 1,
    Desk: 1,
    Music: 1,
    Tomato: 1,
    Todo: 1,
    cur: 2,
    curW: "",
  });
  const [showHeaderDropDown, setShowHeaderDropDown] = useState(false);
  const [showWindow, setShowWindow] = useState({
    SignWindow: { display: true, x: "", y: "" },
    Tomato: { display: false, x: "", y: "" },
    Music: { display: false, x: "", y: "" },
    Todo: { display: false, x: "", y: "" },
  });
  //當使用者使用平板或是手機
  useEffect(() => {
    const { innerWidth } = window;
    if (innerWidth < 900) {
      setNotification({
        title: "Notification",
        content:
          "For the better experience, Using devices with the screen sizes greater than 900px is suggested.",
      });
    }
  }, []);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserstate(user.uid);
        GETFirestore("windowPosition", user.uid)
          .then((doc) => {
            if (doc.exists) {
              setShowWindow(doc.data().showWindow);
            } else {
              // console.log("No such document!");
            }
          })
          .catch((error) => {
            setNotification({
              title: error?.code,
              content: error?.message,
            });
            // console.log("Error getting document:", error);
          });
      } else {
        // console.log("not sign in");
        setShowWindow({
          SignWindow: { display: true, x: "", y: "" },
          Tomato: { display: false, x: "", y: "" },
          Music: { display: false, x: "", y: "" },
          Todo: { display: false, x: "", y: "" },
        });
      }
    });
    //測試 FIXME: not sure!
    return () => {
      setShowWindow({
        SignWindow: { display: true, x: "", y: "" },
        Tomato: { display: false, x: "", y: "" },
        Music: { display: false, x: "", y: "" },
        Todo: { display: false, x: "", y: "" },
      });
    };
  }, []);

  useEffect(() => {
    if (userState) {
      if (
        showWindow.Tomato.x ||
        showWindow.Music.x ||
        showWindow.Todo.x ||
        showWindow.SignWindow.x
      ) {
        SETFirestore("windowPosition", userState, { showWindow: showWindow })
          .then(() => {
            // console.log("Document successfully updte!!!");
          })
          .catch((error) => {
            setNotification({
              title: error?.code,
              content: error?.message,
            });
            // console.error("Error writing document: ", error);
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
        setNotification={setNotification}
        showHeaderDropDown={showHeaderDropDown}
        setShowHeaderDropDown={setShowHeaderDropDown}
      />
      <MainBody
        userState={userState}
        setUserstate={setUserstate}
        setShowWindow={setShowWindow}
        showWindow={showWindow}
        setZIndex={setZIndex}
        zIndex={zIndex}
        notification={notification}
        setNotification={setNotification}
        setShowHeaderDropDown={setShowHeaderDropDown}
        showHeaderDropDown={showHeaderDropDown}
      />
    </>
  );
}

export default App;
