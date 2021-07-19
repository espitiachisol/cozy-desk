import "./Tomato.css";
import React, { useState, useCallback, useEffect, useRef } from "react";
import useDrag from "../hooks/useDrag";
import WindowHeader from "../windowHeader/WindowHeader";
import Dropdown from "../Dropdown/Dropdown";
import { setting, target } from "./tomato-data";

const calcDisplayTime = (time) => {
  let sec = Math.floor(time % 60);
  sec = sec < 10 ? "0" + sec : sec;
  let min = Math.floor(time / 60);
  min = min < 10 ? "0" + min : min;
  return `${min}:${sec}`;
};

const Tomato = ({ setShowWindow, showWindow, zIndex, setZIndex }) => {
  //data from user
  const [targetSelected, setTargetSelected] = useState(setting.target[0]);
  const [workSelected, setWorkSelected] = useState(setting.work[0]);
  const [breakSelected, setBreakSelected] = useState(setting.break[0]);
  //timer

  const playsoundEffect = useRef(null);
  const [intervalId, setIntervalId] = useState(null);
  // const [deg, setDeg] = useState(0);
  const [timeLabel, setTimeLabel] = useState("Work"); //"Work"/"Break"
  const [targetProgress, setTargetProgress] = useState(0);

  const [timer, setTimer] = useState(0);
  const [more, setMore] = useState(false);
  //for window drag
  const [size, setSize] = useState({});
  const [startPositon, setStartPositon] = useState({});
  const curWindow = useCallback((node) => {
    if (node !== null) {
      const response = node.getBoundingClientRect();
      setStartPositon({
        x: response.x,
        y: response.y - 36,
      });
      setSize({ width: response.width, height: response.height });
    }
  }, []);
  let startingPosition = {
    x: startPositon.x,
    y: startPositon.y,
    width: size.width,
    height: size.height,
    defaultX: 700,
    defaultY: 0,
  };
  const [position, mouseDown] = useDrag(startingPosition);
  // useEffect(() => {
  //   if (timeLabel === "Work") {
  //     const calcDeg = () => {
  //       // let thisDeg =
  //       //   ((360 / targetSelected) * (workSelected * 60 - timer)) /
  //       //   (workSelected * 60);
  //       // let thisDeg =
  //       //   (workSelected * 60 * targetSelected * (workSelected * 60 - timer)) /
  //       //   360;
  //       let thisDeg =
  //         (360 * (workSelected * 60 - timer)) /
  //         (workSelected * 60 * targetSelected);
  //       console.log(thisDeg);
  //       return thisDeg;
  //     };
  //     // let newTimer = timer - 1;
  //     // if (newTimer >= 0) {
  //     setDeg(calcDeg());
  //     // } else {
  //     //   setDeg((pre) => {
  //     //     return pre + calcDeg();
  //     //   });
  //     // }
  //   }
  // }, [timer, timeLabel, targetSelected, workSelected]);

  //設定開始播放後不能setting
  useEffect(() => {
    setTimer(workSelected * 60);
  }, [workSelected]);

  const isStarted = intervalId !== null;
  const handleStartStop = () => {
    if (isStarted) {
      clearInterval(intervalId);
      setIntervalId(null);
    } else {
      const newIntervalId = setInterval(() => {
        setTimer((pretimer) => {
          //假如(目前倒數時間-1)大於等於0,回傳(目前時間-1),如果否,回傳(目前時間)
          let newpretimer = pretimer - 1;
          if (newpretimer >= 0) {
            return pretimer - 1;
          } else {
            if (timeLabel === "Work") {
              console.log("work area");
              setTimeLabel("Break");
              setTimer(breakSelected * 60);
              setTargetProgress(targetProgress + 1);
            } else if (timeLabel === "Break") {
              console.log("Break area");
              setTimeLabel("Work");
              setTimer(workSelected * 60);
            }
            playsoundEffect.current.play();
            return pretimer;
          }
        });
      }, 100);

      setIntervalId(newIntervalId);
    }
  };
  console.log(timeLabel);
  const resetAll = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setTimeLabel("Work");
    setTimer(25 * 60);
    setWorkSelected(25);
    setBreakSelected(5);
    setTargetProgress(0);
    playsoundEffect.current.load();
  };
  // console.log(`/music/${timeLabel}.mp3`);
  // useEffect(() => {
  // setDeg((pre) => {
  //   return (
  //     (((360 / targetSelected) * (workSelected * 60 - timer)) /
  //       workSelected) *
  //       60 +
  //     pre
  //   );
  // });
  // }, [deg]);

  // useEffect(() => {
  //   setDeg(calcDeg());
  // }, [targetProgress]);

  return (
    <div
      className="tomato window"
      ref={curWindow}
      style={{ top: position.y, left: position.x, zIndex: zIndex.Tomato }}
      onClick={() => {
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
        label="Tomato Timer"
      />
      <div className="tomato-container-all">
        <div className="tomato-container">
          <div className="tomato-outline">
            <div
              className="tomato-pieces"
              style={{
                backgroundImage: target[targetSelected][targetProgress],
              }}
            ></div>
            <img
              src={`/images/clock_${targetSelected}.png`}
              alt="clock-label"
              className="tomato-clock-label"
            />
            <img
              src="/images/clock_hand.png"
              alt="clock-hand"
              className="tomato-clock-hand"
              style={{
                transform: `rotate(${0}deg)`,
              }}
            />
            <div className="target-progress">{`${targetProgress}/${targetSelected}`}</div>
          </div>
        </div>
        <div className="content-container">
          <div className="tomato-time">
            <h4 className="tomato-counter">{calcDisplayTime(timer)}</h4>

            <button
              className="tomato-play-icon"
              onClick={() => {
                handleStartStop();
                // calcDeg();
              }}
            >
              <img
                src={`/images/px-${isStarted ? "03" : "02"}.png`}
                alt="playStop-icon"
              />
            </button>
            {/* <button className="tomato-play-icon">
              <img src={`/images/px-06.png`} alt="playStop-icon" />
            </button> */}
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
            style={{ height: `${more ? "150px" : "0px"}` }}
          >
            {more ? (
              <div className="tomato-setting">
                <p className="dropdown-label">Target</p>
                <Dropdown
                  options={setting.target}
                  onSelectedChange={setTargetSelected}
                />
                <p className="dropdown-label">Work duration</p>
                <Dropdown
                  options={setting.work}
                  onSelectedChange={setWorkSelected}
                />
                <p className="dropdown-label">Break duration</p>
                <Dropdown
                  options={setting.break}
                  onSelectedChange={setBreakSelected}
                />
                <button
                  className="restart"
                  onClick={() => {
                    resetAll();
                  }}
                >
                  RESETALL
                </button>
                <p className="restart-warn">
                  Be careful!Reset will lose all your progress!
                </p>
              </div>
            ) : null}
          </div>
          <audio
            ref={playsoundEffect}
            // :!TODO帶增加不同聲音
            // src={timeLabel === "Work" ? "/music/Work.mp3" : "/music/Break.mp3"}
            src="/music/Work.mp3"
          ></audio>
        </div>
      </div>
    </div>
  );
};
export default Tomato;
