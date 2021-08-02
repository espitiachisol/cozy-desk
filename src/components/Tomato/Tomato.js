import "./Tomato.css";
import React, { useState, useCallback, useEffect, useRef } from "react";
import useDrag from "../hooks/useDrag";
import WindowHeader from "../windowHeader/WindowHeader";
import Dropdown from "../Dropdown/Dropdown";
import { setting, target } from "./tomato-data";
import { firestore } from "../../firebaseConfig";
import Alert from "../Alert/Alert";

const calcDisplayTime = (time) => {
  let sec = Math.floor(time % 60);
  sec = sec < 10 ? "0" + sec : sec;
  let min = Math.floor(time / 60);
  min = min < 10 ? "0" + min : min;
  return `${min}:${sec}`;
};
const calcDeg = (sessionSelected, targetSelected, timeLeft, progress) => {
  let thisDeg =
    (360 * (sessionSelected * 60 - timeLeft)) /
    (sessionSelected * 60 * targetSelected);
  return thisDeg + progress * (360 / targetSelected);
};

const Tomato = ({
  setShowWindow,
  showWindow,
  zIndex,
  setZIndex,
  userState,
}) => {
  //data from user
  const [targetSelected, setTargetSelected] = useState(setting.target[0]);
  // const [sessionSelected, setSessionSelected] = useState(setting.session[1]);
  const [sessionSelected, setSessionSelected] = useState(setting.session[1]);
  const [breakSelected, setBreakSelected] = useState(setting.break[0]);
  const [currentSessionType, setCurrentSessionType] = useState("Session"); // 'Session' or 'Break'
  //timer

  const playSessionsoundEffect = useRef(null);
  const playBreaksoundEffect = useRef(null);
  const [intervalId, setIntervalId] = useState(null);
  const [deg, setDeg] = useState(0);
  const [progress, setProgress] = useState(0);

  const [timeLeft, setTimeLeft] = useState(sessionSelected * 60);
  const [more, setMore] = useState(false);
  //for window drag
  const [size, setSize] = useState({});
  const [startPositon, setStartPositon] = useState({});
  //
  const [showAlert, setShowAlert] = useState(false);

  const curWindow = useCallback((node) => {
    if (node !== null) {
      const response = node.getBoundingClientRect();
      setStartPositon({
        x: response.x,
        y: response.y - 32,
      });
      setSize({ width: response.width, height: response.height });
    }
  }, []);
  let startingPosition = {
    x: startPositon.x,
    y: startPositon.y,
    width: size.width,
    height: size.height,
    defaultX: parseInt(showWindow.Tomato.x, 10) || 20,
    defaultY: parseInt(showWindow.Tomato.y, 10) || 0,
  };
  const [position, mouseDown] = useDrag(startingPosition);
  useEffect(() => {
    if (userState) {
      firestore
        .collection("tomatoClock")
        .doc(userState)
        .get()
        .then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            const returnData = doc.data();
            setTargetSelected(returnData.target);
            setBreakSelected(returnData.break);
            setSessionSelected(returnData.session);
            setCurrentSessionType(returnData.currentSessionType);
            setProgress(returnData.progress);
            setTimeLeft(returnData.timeLeft);
            setDeg(returnData.deg);
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    } else {
      setIntervalId(null);
      setCurrentSessionType("Session");
      setTimeLeft(25 * 60);
      setSessionSelected(25);
      setBreakSelected(5);
      setProgress(0);
      setTargetSelected(8);
      setDeg(0);
    }
    return () => {
      setIntervalId(null);
    };
  }, [userState]);

  useEffect(() => {
    if (timeLeft === 0) {
      if (currentSessionType === "Session") {
        console.log("play");
        playBreaksoundEffect.current.play();
        setCurrentSessionType("Break");
        setProgress((preProgress) => preProgress + 1);
        setTimeLeft(breakSelected * 60);
      } else if (currentSessionType === "Break") {
        console.log("play");
        playSessionsoundEffect.current.play();
        setCurrentSessionType("Session");
        setTimeLeft(sessionSelected * 60);
      }
    }
  }, [timeLeft, currentSessionType, breakSelected, sessionSelected]);
  useEffect(() => {
    if (currentSessionType === "Session") {
      setDeg(calcDeg(sessionSelected, targetSelected, timeLeft, progress));
    }
  }, [timeLeft, currentSessionType, targetSelected, sessionSelected, progress]);

  useEffect(() => {
    if (currentSessionType === "Session") {
      setTimeLeft(sessionSelected * 60);
    }
  }, [sessionSelected, currentSessionType]);
  useEffect(() => {
    if (currentSessionType === "Break") {
      setTimeLeft(breakSelected * 60);
    }
  }, [breakSelected, currentSessionType]);
  const saveData = () => {
    if (userState) {
      firestore
        .collection("tomatoClock")
        .doc(userState)
        .set({
          target: targetSelected,
          session: sessionSelected,
          break: breakSelected,
          timeLeft: timeLeft,
          progress: progress,
          currentSessionType: currentSessionType,
          deg: deg,
        })
        .then(() => {
          console.log("Document successfully updte!!!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  };
  const isStarted = intervalId !== null;
  const handleStartStop = () => {
    saveData();
    if (isStarted) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const newIntervalId = setInterval(() => {
        setTimeLeft((pretimer) => pretimer - 1);
      }, 1000);
      setIntervalId(newIntervalId);
    }
  };
  const clearCurTime = () => {
    if (currentSessionType === "Session") {
      setTimeLeft(sessionSelected * 60);
    }
    if (currentSessionType === "Break") {
      setTimeLeft(breakSelected * 60);
    }
  };
  const resetAll = () => {
    playSessionsoundEffect.current.load();
    playBreaksoundEffect.current.load();
    clearInterval(intervalId);
    setIntervalId(null);
    setCurrentSessionType("Session");
    setTimeLeft(25 * 60);
    setSessionSelected(25);
    setBreakSelected(5);
    setProgress(0);
    setTargetSelected(8);
    setDeg(0);
    setShowAlert(false);
  };

  return (
    <div
      className="tomato window"
      ref={curWindow}
      style={{ top: position.y, left: position.x, zIndex: zIndex.Tomato }}
      onMouseDown={() => {
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
      <WindowHeader
        mouseDown={mouseDown}
        setShowWindow={setShowWindow}
        showWindow={showWindow}
        position={position}
        label="Tomato"
      />
      <div className="tomato-container-all">
        <div className="tomato-container">
          <div
            className="tomato-outline"
            style={{
              borderColor: `${
                currentSessionType === "Session"
                  ? "rgb(163, 108, 108)"
                  : "rgb(60, 106, 102)"
              }`,
            }}
          >
            <div className="tomato-outline-color">
              <div
                className="tomato-pieces"
                style={{
                  backgroundImage: target[targetSelected][progress],
                }}
              ></div>
              <img
                src={`/images/clock_${targetSelected}.png`}
                alt="clock-label"
                className="tomato-clock-label"
              />
              <div className="cur-session">
                {currentSessionType === "Session" ? "Focus" : "Break"}
              </div>
              <img
                src="/images/clock_hand.png"
                alt="clock-hand"
                className="tomato-clock-hand"
                style={{
                  transform: `rotate(${deg}deg)`,
                }}
              />
              <div className="target-progress">{`${progress}/${targetSelected}`}</div>
            </div>
          </div>
        </div>
        <div className="content-container">
          <div className="tomato-time">
            <h4 className="tomato-counter">{calcDisplayTime(timeLeft)}</h4>

            <button
              className="tomato-play-icon button-style"
              onClick={() => {
                handleStartStop();
              }}
            >
              <img
                src={`/images/${isStarted ? "icon_stop" : "icon_play"}.svg`}
                alt="playStop-icon"
              />
            </button>
            <button
              className="tomato-play-icon button-style"
              onClick={() => {
                clearCurTime();
              }}
            >
              <img src={`/images/icon_reset.svg`} alt="playStop-icon" />
            </button>
          </div>
          <div className="tomato-btn-con">
            <button
              onClick={() => {
                setMore(!more);
              }}
            >
              Setting <span>&#9660;</span>
            </button>
          </div>
          <div
            className="tomato-setting-container"
            style={{ height: `${more ? "120px" : "0px"}` }}
          >
            {more ? (
              <div className="tomato-setting">
                <p className="dropdown-label">Target</p>
                <Dropdown
                  options={setting.target}
                  onSelectedChange={setTargetSelected}
                  Selected={targetSelected}
                />
                <p className="dropdown-label">Session length</p>
                <Dropdown
                  options={setting.session}
                  onSelectedChange={setSessionSelected}
                  Selected={sessionSelected}
                />
                <p className="dropdown-label">Break length</p>
                <Dropdown
                  options={setting.break}
                  onSelectedChange={setBreakSelected}
                  Selected={breakSelected}
                />
                <button
                  className="restart button-style"
                  onClick={() => {
                    setShowAlert(true);
                  }}
                >
                  RESETALL
                </button>
              </div>
            ) : null}
          </div>
          <audio ref={playBreaksoundEffect} src="/music/Break.mp3"></audio>
          <audio ref={playSessionsoundEffect} src="/music/Work.mp3"></audio>
        </div>
        {showAlert ? (
          <Alert
            setShowAlert={setShowAlert}
            confirm={resetAll}
            message={{
              title: "Are you sure ?",
              text: "Reset all will lose all your progress.",
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
export default Tomato;
