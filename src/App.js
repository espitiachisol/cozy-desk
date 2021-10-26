import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { getFirestore, setFirestore } from './api/firestore';
import { defaultZIndex, defaultWindows } from './utils/constants/defaultPosition';
import Header from './components/header/Header';
import MainBody from './components/MainBody/MainBody';
import './App.css';

function App() {
  const [userState, setUserState] = useState('');
  const [notification, setNotification] = useState({
    title: '',
    content: '',
  });
  const [zIndex, setZIndex] = useState(defaultZIndex);

  const [showWindow, setShowWindow] = useState(defaultWindows);
  //  當使用者使用平板或是手機
  useEffect(() => {
    const { innerWidth } = window;
    if (innerWidth < 900) {
      setNotification({
        title: 'Notification',
        content:
          'For the better experience, Using devices with the screen sizes greater than 900px is suggested.',
      });
    }
  }, []);
  useEffect(() => {
    if (userState) {
      getFirestore('windowPosition', userState)
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
          console.error('Error getting document:', error);
        });
    } else {
      setShowWindow(defaultWindows);
    }
    return () => {
      setShowWindow(defaultWindows);
    };
  }, [userState]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserState(user.uid);
      }
    });
  }, []);

  useEffect(() => {
    if (!userState) return;
    if (showWindow.tomato.x || showWindow.music.x || showWindow.todo.x || showWindow.signWindow.x) {
      (async () => {
        try {
          await setFirestore('windowPosition', userState, { showWindow });
        } catch (error) {
          setNotification({
            title: error?.code,
            content: error?.message,
          });
          console.error('Error writing document: ', error);
        }
      })();
    }
  }, [userState, showWindow]);

  return (
    <>
      <Header
        userState={userState}
        setUserState={setUserState}
        setShowWindow={setShowWindow}
        showWindow={showWindow}
        setZIndex={setZIndex}
        zIndex={zIndex}
        setNotification={setNotification}
      />
      <MainBody
        userState={userState}
        setUserState={setUserState}
        setShowWindow={setShowWindow}
        showWindow={showWindow}
        setZIndex={setZIndex}
        zIndex={zIndex}
        notification={notification}
        setNotification={setNotification}
      />
    </>
  );
}

export default App;
