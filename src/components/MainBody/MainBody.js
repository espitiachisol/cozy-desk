import React from "react";
import Music from "../Music/Music";
import Tomato from "../Tomato/Tomato";
import Todo from "../Todo/Todo";
import SignWindow from "../member/SignWindow";
import "./MainBody.css";
const MainBody = ({
  userState,
  setUserstate,
  setShowWindow,
  showWindow,
  zIndex,
  setZIndex,
}) => {
  return (
    <div className="main-body">
      {showWindow.SignWindow.display ? (
        <SignWindow
          userState={userState}
          setUserstate={setUserstate}
          showWindow={showWindow}
          setShowWindow={setShowWindow}
          setZIndex={setZIndex}
          zIndex={zIndex}
        />
      ) : null}
      {showWindow.Music.display ? (
        <Music
          showWindow={showWindow}
          setShowWindow={setShowWindow}
          setZIndex={setZIndex}
          zIndex={zIndex}
        />
      ) : null}
      {showWindow.Tomato.display ? (
        <Tomato
          showWindow={showWindow}
          setShowWindow={setShowWindow}
          setZIndex={setZIndex}
          zIndex={zIndex}
        />
      ) : null}
      {showWindow.Todo.display ? (
        <Todo
          userState={userState}
          setUserstate={setUserstate}
          showWindow={showWindow}
          setShowWindow={setShowWindow}
          setZIndex={setZIndex}
          zIndex={zIndex}
        />
      ) : null}
      <div className="icon-con">
        <div
          className="each-icon"
          onClick={() => {
            setShowWindow({ ...showWindow, Tomato: { display: true } });
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
            setShowWindow({ ...showWindow, Music: { display: true } });
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
            setShowWindow({ ...showWindow, Todo: { display: true } });
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
      {/* <div className="test">
        <img src="/images/test.png" alt="tomato" style={{ width: "800px" }} />
      </div> */}
    </div>
  );
};

export default MainBody;
