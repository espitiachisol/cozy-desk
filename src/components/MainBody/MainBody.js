import React, { useRef, useState, useEffect } from "react";
import { returnQuote } from "../../api/axios.api";
import Music from "../Music/Music";
import Tomato from "../Tomato/Tomato";
import Todo from "../Todo/Todo";
import SignWindow from "../Sign/SignWindow";
import Notification from "../Notification/Notification";

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
  showHeaderDropDown,
  setShowHeaderDropDown,
}) => {
  const dropDownRef = useRef(null);
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
  const hideHeaderDropDown = (e) => {
    if (e.target.contains(dropDownRef.current)) {
      setShowHeaderDropDown(false);
    } else {
      return;
    }
  };
  return (
    <div
      className="main-body"
      style={{
        backgroundImage: " url('/images/bg-img.png')",
      }}
      onClick={(e) => {
        hideHeaderDropDown(e);
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
        <div
          className="each-icon"
          onClick={() => {
            setShowWindow({
              ...showWindow,
              Tomato: {
                display: true,
                x: showWindow.Tomato.x,
                y: showWindow.Tomato.y,
              },
            });
            if (zIndex.curW !== "Tomato") {
              setZIndex({
                ...zIndex,
                Tomato: zIndex.cur,
                cur: zIndex.cur + 1,
                curW: "Tomato",
              });
            }
          }}
        >
          <img
            className="desk-icon"
            src="/images/icon-tomato.png"
            alt="tomato"
          />
          <p>Tomato</p>
        </div>
        <div
          className="each-icon"
          onClick={() => {
            setShowWindow({
              ...showWindow,
              Music: {
                display: true,
                x: showWindow.Music.x,
                y: showWindow.Music.y,
              },
            });
            if (zIndex.curW !== "Music") {
              setZIndex({
                ...zIndex,
                Music: zIndex.cur,
                cur: zIndex.cur + 1,
                curW: "Music",
              });
            }
          }}
        >
          <img
            className="desk-icon"
            src="/images/icon-mixtape.png"
            alt="icon-mixtape"
          />
          <p>Mixtape</p>
        </div>
        <div
          className="each-icon"
          onClick={() => {
            setShowWindow({
              ...showWindow,
              Todo: {
                display: true,
                x: showWindow.Todo.x,
                y: showWindow.Todo.y,
              },
            });
            if (zIndex.curW !== "Todo") {
              setZIndex({
                ...zIndex,
                Todo: zIndex.cur,
                cur: zIndex.cur + 1,
                curW: "Todo",
              });
            }
          }}
        >
          <img
            className="desk-icon"
            src="/images/icon-todo.png"
            alt="icon-todo"
          />
          <p>Todo</p>
        </div>
      </div>
      {showHeaderDropDown ? (
        <div className="header-drop-down-con" ref={dropDownRef}>
          <div
            className="header-drop-down-each"
            onClick={() => {
              setShowWindow({
                ...showWindow,
                SignWindow: {
                  display: true,
                  x: showWindow.SignWindow.x,
                  y: showWindow.SignWindow.y,
                },
              });
              if (zIndex.curW !== "SignWindow") {
                setZIndex({
                  ...zIndex,
                  SignWindow: zIndex.cur,
                  cur: zIndex.cur + 1,
                  curW: "SignWindow",
                });
              }
            }}
          >
            <p>Sign</p>
          </div>
          <div
            className="header-drop-down-each"
            onClick={() => {
              setShowWindow({
                ...showWindow,
                Tomato: {
                  display: true,
                  x: showWindow.Tomato.x,
                  y: showWindow.Tomato.y,
                },
              });
              if (zIndex.curW !== "Tomato") {
                setZIndex({
                  ...zIndex,
                  Tomato: zIndex.cur,
                  cur: zIndex.cur + 1,
                  curW: "Tomato",
                });
              }
            }}
          >
            <p>Tomato</p>
          </div>
          <div
            className="header-drop-down-each"
            onClick={() => {
              setShowWindow({
                ...showWindow,
                Music: {
                  display: true,
                  x: showWindow.Music.x,
                  y: showWindow.Music.y,
                },
              });
              if (zIndex.curW !== "Music") {
                setZIndex({
                  ...zIndex,
                  Music: zIndex.cur,
                  cur: zIndex.cur + 1,
                  curW: "Music",
                });
              }
            }}
          >
            <p>Mixtape</p>
          </div>
          <div
            className="header-drop-down-each"
            onClick={() => {
              setShowWindow({
                ...showWindow,
                Todo: {
                  display: true,
                  x: showWindow.Todo.x,
                  y: showWindow.Todo.y,
                },
              });
              if (zIndex.curW !== "Todo") {
                setZIndex({
                  ...zIndex,
                  Todo: zIndex.cur,
                  cur: zIndex.cur + 1,
                  curW: "Todo",
                });
              }
            }}
          >
            <p>Todo</p>
          </div>
        </div>
      ) : null}
      {notification.title ? (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      ) : null}
      {/* <div className="test">
        <img src="/images/test.png" alt="tomato" style={{ width: "800px" }} />
      </div> */}
      <p className="copyright">Copyright © 2021 CozyDesk /Sol Chi</p>
    </div>
  );
};

export default MainBody;
