import Header from "./components/header/Header";
import MainBody from "./components/MainBody/MainBody";
import { auth, firestore } from "./firebaseConfig";

import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import config from "./config";

const options = {
  method: "GET",
  url: "https://quotes15.p.rapidapi.com/quotes/random/",
  headers: {
    "x-rapidapi-key": `${config.Quote_API_KEY}`,
    "x-rapidapi-host": "quotes15.p.rapidapi.com",
  },
};
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
              // console.log("No such document!");
              setNotification({
                title: "Notification",
                content: "No such document!",
              });
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
  const [quote, setQuote] = useState({});
  useEffect(() => {
    const getQuote = async () => {
      const { data } = await axios.request(options);
      if (data?.content.length > 250) {
        getQuote();
      } else {
        setQuote({ content: data.content, author: data.originator.name });
      }
    };
    getQuote();
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
      />
      <MainBody
        userState={userState}
        setUserstate={setUserstate}
        setShowWindow={setShowWindow}
        showWindow={showWindow}
        setZIndex={setZIndex}
        zIndex={zIndex}
        quote={quote}
        notification={notification}
        setNotification={setNotification}
      />
    </>
  );
}

export default App;
