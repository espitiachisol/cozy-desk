import React, { useState, useEffect } from 'react';
import returnRandomQuote from '../../api/axios';
// Components
import Music from '../Music/Music';
import Tomato from '../Tomato/Tomato';
import Todo from '../Todo/Todo';
import SignWindow from '../Sign/SignWindow';
import Notification from '../Notification/Notification';
import EachIcon from './MainBodyItems/EachIcon';
// styles
import './MainBody.css';

const MainBody = ({
  userState,
  setUserState,
  setShowWindow,
  showWindow,
  zIndex,
  setZIndex,
  setNotification,
  notification,
}) => {
  const [quote, setQuote] = useState({});
  const { signWindow, music, tomato, todo } = showWindow;
  const getQuote = async () => {
    const { data } = await returnRandomQuote();
    if (data?.content.length > 230) {
      getQuote();
    } else {
      setQuote({ content: data.content, author: data.originator.name });
    }
  };
  useEffect(getQuote, []);
  return (
    <div
      className="main-body"
      style={{
        backgroundImage: " url('/images/bg-img.png')",
      }}
    >
      {signWindow.display ? (
        <SignWindow
          userState={userState}
          setUserState={setUserState}
          showWindow={showWindow}
          setShowWindow={setShowWindow}
          setZIndex={setZIndex}
          zIndex={zIndex}
          quote={quote}
          setNotification={setNotification}
        />
      ) : null}
      {music.display ? (
        <Music
          userState={userState}
          showWindow={showWindow}
          setShowWindow={setShowWindow}
          setZIndex={setZIndex}
          zIndex={zIndex}
          setNotification={setNotification}
        />
      ) : null}
      {tomato.display ? (
        <Tomato
          userState={userState}
          showWindow={showWindow}
          setShowWindow={setShowWindow}
          setZIndex={setZIndex}
          zIndex={zIndex}
          setNotification={setNotification}
        />
      ) : null}
      {todo.display ? (
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
          label="Tomato"
          iconImg="/images/icon-tomato.png"
        />
        <EachIcon
          setShowWindow={setShowWindow}
          showWindow={showWindow}
          setZIndex={setZIndex}
          zIndex={zIndex}
          label="Mixtape"
          iconImg="/images/icon-mixtape.png"
        />
        <EachIcon
          setShowWindow={setShowWindow}
          showWindow={showWindow}
          setZIndex={setZIndex}
          zIndex={zIndex}
          label="Todo"
          iconImg="/images/icon-todo.png"
        />
      </div>
      {notification.title ? (
        <Notification notification={notification} setNotification={setNotification} />
      ) : null}
      <p className="copyright">Copyright © 2021 CozyDesk /Sol Chi</p>
    </div>
  );
};

export default MainBody;
