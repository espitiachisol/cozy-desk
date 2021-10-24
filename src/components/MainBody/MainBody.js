import React, { useState, useEffect } from "react";
import { returnQuote } from "../../api/axios.api";
//Components
import Music from "../Music/Music";
import Tomato from "../Tomato/Tomato";
import Todo from "../Todo/Todo";
import SignWindow from "../Sign/SignWindow";
import Notification from "../Notification/Notification";
import EachIcon from "./MainBodyItems/EachIcon";
//styles
import "./MainBody.css";

const MainBody = ({
  userState,
  setUserstate,
  setShowWindow,
  showWindow,
  zIndex,
  setZIndex,
  setNotification,
  notification,
}) => {
  const [quote, setQuote] = useState({});
  useEffect(() => {
    const getQuote = async () => {
      const { data } = await returnQuote();
      if (data?.content.length > 250) {
        getQuote();
      } else {
        setQuote({ content: data.content, author: data.originator.name });
      }
    };
    getQuote();
  }, []);

  return (
    <div
      className="main-body"
      style={{
        backgroundImage: " url('/images/bg-img.png')",
      }}
    >
      {showWindow.SignWindow.display ? (
        <SignWindow
          userState={userState}
          setUserstate={setUserstate}
          showWindow={showWindow}
          setShowWindow={setShowWindow}
          setZIndex={setZIndex}
          zIndex={zIndex}
          quote={quote}
          setNotification={setNotification}
        />
      ) : null}
      {showWindow.Music.display ? (
        <Music
          userState={userState}
          showWindow={showWindow}
          setShowWindow={setShowWindow}
          setZIndex={setZIndex}
          zIndex={zIndex}
          setNotification={setNotification}
        />
      ) : null}
      {showWindow.Tomato.display ? (
        <Tomato
          userState={userState}
          showWindow={showWindow}
          setShowWindow={setShowWindow}
          setZIndex={setZIndex}
          zIndex={zIndex}
          setNotification={setNotification}
        />
      ) : null}
      {showWindow.Todo.display ? (
        <Todo
          userState={userState}
          showWindow={showWindow}
          setShowWindow={setShowWindow}
          setZIndex={setZIndex}
          zIndex={zIndex}
          setNotification={setNotification}
        />
      ) : null}
      <div className="icon-con">
        <EachIcon
          setShowWindow={setShowWindow}
          showWindow={showWindow}
          setZIndex={setZIndex}
          zIndex={zIndex}
          label={"Tomato"}
          iconImg={"/images/icon-tomato.png"}
        />
        <EachIcon
          setShowWindow={setShowWindow}
          showWindow={showWindow}
          setZIndex={setZIndex}
          zIndex={zIndex}
          label={"Mixtape"}
          iconImg={"/images/icon-mixtape.png"}
        />
        <EachIcon
          setShowWindow={setShowWindow}
          showWindow={showWindow}
          setZIndex={setZIndex}
          zIndex={zIndex}
          label={"Todo"}
          iconImg={"/images/icon-todo.png"}
        />
      </div>
      {notification.title ? (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      ) : null}
      <p className="copyright">Copyright © 2021 CozyDesk /Sol Chi</p>
    </div>
  );
};

export default MainBody;
