import "./Tomato.css";
import React, { useState, useCallback, useEffect, useRef } from "react";
import useDrag from "../hooks/useDrag";
import WindowHeader from "../shared/WindowHeader/WindowHeader";
import Dropdown from "../Dropdown/Dropdown";
import { setting, target } from "./tomato-data";
import { firestore } from "../../firebaseConfig";
import Alert from "../shared/Alert/Alert";
import SettingBar from "../shared/SettingBar/SettingBar";
import { getMinuteSecondString } from "../../utils/helpers/time";

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
  setNotification,
}) => {
  //data from user
  const [targetSelected, setTargetSelected] = useState(setting.target[0]);
  const [sessionSelected, setSessionSelected] = useState(setting.session[1]);
  const [breakSelected, setBreakSelected] = useState(setting.break[0]);
  const [currentSessionType, setCurrentSessionType] = useState("Session"); // 'Session' or 'Break'
  //timer

  const playSessionsoundEffect = useRef(null);
  const playBreaksoundEffect = useRef(null);
  // const playMuteSoundEffect = useRef(null);
  const [intervalId, setIntervalId] = useState(null);
  const [deg, setDeg] = useState(0);
  const [progress, setProgress] = useState(0);

  const [timeLeft, setTimeLeft] = useState(sessionSelected * 60);
  const [more, setMore] = useState(false);
  //for window drag
  const [size, setSize] = useState({});
  const [startPosition, setStartPosition] = useState({});
  //
  const [showAlert, setShowAlert] = useState(false);
  const curWindow = useCallback((node) => {
    if (node === null) return;
    const response = node.getBoundingClientRect();
    setStartPosition({
      x: response.x,
      y: response.y - 32,
    });
    setSize({ width: response.width, height: response.height });
  }, []);

  const [position, mouseDown] = useDrag({
    x: startPosition.x,
    y: startPosition.y,
    width: size.width,
    height: size.height,
    defaultX: parseInt(showWindow.tomato.x, 10) || 20,
    defaultY: parseInt(showWindow.tomato.y, 10) || 0,
  });

  useEffect(() => {
    if (userState) {
      firestore
        .collection("tomatoClock")
        .doc(userState)
        .get()
        .then((doc) => {
          if (doc.exists) {
            // console.log("Document data:", doc.data());
            const returnData = doc.data();
            setTargetSelected(returnData.target);
            setBreakSelected(returnData.break);
            setSessionSelected(returnData.session);
            setCurrentSessionType(returnData.currentSessionType);
            setProgress(returnData.progress);
            setTimeLeft(returnData.timeLeft);
            setDeg(returnData.deg);
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
      clearInterval(intervalId);
      setIntervalId(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userState, setNotification]);

  useEffect(() => {
    if (timeLeft === 0) {
      if (currentSessionType === "Session") {
        // console.log("play");
        playBreaksoundEffect.current.play();
        setCurrentSessionType("Break");
        setProgress((preProgress) => preProgress + 1);
        setTimeLeft(breakSelected * 60);
      } else if (currentSessionType === "Break") {
        // console.log("play");
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
          // console.log("Document successfully updte!!!");
        })
        .catch((error) => {
          setNotification({
            title: error?.code,
            content: error?.message,
          });
        });
    }
  };

  const isStarted = intervalId !== null;
  const handleStartStop = () => {
    saveData();
    if (isStarted) {
      clearInterval(intervalId);
      // playMuteSoundEffect.current.pause();
      setIntervalId(null);
    } else {
      const newIntervalId = setInterval(() => {
        setTimeLeft((pretimer) => pretimer - 1);
      }, 1000);
      // playMuteSoundEffect.current.volume = 0.5;
      // playMuteSoundEffect.current.play();
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
    setShowAlert(false);
  };

  const witchAttentionToShow = useCallback(
    (e) => {
      if (e.target.options.length === 9) {
        if (currentSessionType === "Session") {
          setNotification({
            title: "Attention!",
            content:
              "You are currently in the focus time. If you change the session length, your current time will be reset. You can either reset it or wait till the break time.",
          });
        }
      }
      if (e.target.options.length === 4) {
        if (currentSessionType === "Break") {
          setNotification({
            title: "Attention!",
            content:
              "You are currently in the break time. If you change the break length, your current time will be reset. You can either reset it or wait till the focus time.",
          });
        }
      }
    },
    [currentSessionType, setNotification]
  );
  const resetAll = () => {
    // playMuteSoundEffect.current.load();
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
      style={{ top: position.y, left: position.x, zIndex: zIndex.tomato }}
      onMouseDown={() => {
        if (zIndex.curW !== "tomato") {
          setZIndex({
            ...zIndex,
            tomato: zIndex.cur,
            cur: zIndex.cur + 1,
            curW: "tomato",
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
                {targetSelected === progress ? (
                  <p>Congratulations!</p>
                ) : (
                  <p>{currentSessionType === "Session" ? "Focus" : "Break"}</p>
                )}
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
            <h4 className="tomato-counter">
              {getMinuteSecondString(timeLeft)}
            </h4>

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
                setShowAlert("RESET");
              }}
            >
              <img src={`/images/icon_reset.svg`} alt="playStop-icon" />
            </button>
          </div>
          <div className="tomato-setting-container">
            <SettingBar setMore={setMore} more={more} label={"Settings"} />
            <div
              className="tomato-options-container"
              style={{ minHeight: `${more ? "120px" : "0px"}` }}
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
                    witchAttentionToShow={witchAttentionToShow}
                  />
                  <p className="dropdown-label">Break length</p>
                  <Dropdown
                    options={setting.break}
                    onSelectedChange={setBreakSelected}
                    Selected={breakSelected}
                    witchAttentionToShow={witchAttentionToShow}
                  />
                  <button
                    className="restart button-style"
                    onClick={() => {
                      setShowAlert("RESETALL");
                    }}
                  >
                    RESETALL
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          <audio ref={playBreaksoundEffect} src="/music/Break.mp3"></audio>
          <audio ref={playSessionsoundEffect} src="/music/Work.mp3"></audio>
          {/* <audio
            ref={playMuteSoundEffect}
            src="/music/mute_sound.ogg"
            loop={true}
          ></audio> */}
        </div>
        {showAlert === "RESETALL" ? (
          <Alert
            setShowAlert={setShowAlert}
            confirm={resetAll}
            message={{
              title: "Are you sure ?",
              text: "Reset all will lose all your progress.",
            }}
          />
        ) : null}
        {showAlert === "RESET" ? (
          <Alert
            setShowAlert={setShowAlert}
            confirm={clearCurTime}
            message={{
              title: "Are you sure ?",
              text: "Your current interval will be reset.",
            }}
          />
        ) : null}
      </div>
    </div>
  );
};
export default Tomato;
