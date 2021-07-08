import React, { useState, useCallback, useRef } from "react";
import useDrag from "../hooks/useDrag";
import WindowHeader from "../windowHeader/WindowHeader";
import "./Music.css";
const songs = [
  {
    title: "Study With Me",
    subtitle: "Soft Piano Music for Reading",
    src: "/music/01.mp3",
    img: "/images/CD-a.png",
    icon: "/images/CD-p.png",
  },
  {
    title: "Forest",
    subtitle: "Light Music",
    src: "/music/02.mp3",
    img: "/images/CD-a.png",
    icon: "/images/CD-p.png",
  },
  {
    title: "Piano",
    subtitle: "Yiruma's Greatest Hits",
    src: "/music/03.mp3",
    img: "/images/CD-a.png",
    icon: "/images/CD-p.png",
  },
  {
    title: "Rock Songs",
    subtitle: "Best Rock Hits of the 2000's",
    src: "/music/04.mp3",
    img: "/images/CD-a.png",
    icon: "/images/CD-p.png",
  },
  {
    title: "Classic Love Songs",
    subtitle: "Music that bring back to old days.",
    src: "/music/05.mp3",
    img: "/images/CD-a.png",
    icon: "/images/CD-p.png",
  },
];

const Music = ({ setShowWindow, showWindow, zIndex, setZIndex }) => {
  const control = useRef(null);
  const [size, setSize] = useState({});
  const [startPositon, setStartPositon] = useState({});
  const [songIndex, setSongIndex] = useState(0);
  const [isplaying, setIsplaying] = useState(false);
  const [rotate, setRotate] = useState("");

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
  const play = () => {
    control.current.play();
    setIsplaying(true);
    setRotate("play");
  };
  const stop = () => {
    control.current.pause();
    setIsplaying(false);
    setRotate("");
  };
  const pre = () => {
    songIndex === 0
      ? setSongIndex(songs.length - 1)
      : setSongIndex(songIndex - 1);
  };
  const next = () => {
    songIndex === songs.length - 1
      ? setSongIndex(0)
      : setSongIndex(songIndex + 1);
  };

  return (
    <div
      className="music window"
      ref={curWindow}
      style={{ top: position.y, left: position.x, zIndex: zIndex.Music }}
      onClick={() => {
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
      <WindowHeader
        mouseDown={mouseDown}
        setShowWindow={setShowWindow}
        showWindow={showWindow}
        label="Music"
      />
      <div className="music-player-all">
        {/* <div className="music-lists">
          <div className="music-item">
            <img src="/images/CD-p.png" alt="cd-icon" />
            <p>ROMANCE</p>
          </div>
          <div className="music-item">
            <img src="/images/CD-p.png" alt="cd-icon" />
            <p>ROMANCE</p>
          </div>
          <div className="music-item">
            <img src="/images/CD-p.png" alt="cd-icon" />
            <p>ROMANCE</p>
          </div>
        </div> */}
      </div>
      <div className="tape-container">
        <div className={`tape ${rotate}`}>
          <svg viewBox="0 0 860 550">
            <path
              class="a"
              d="M799.87,32c-.43,0-.85,0-1.28,0H61.09c-.38,0-.75,0-1.12,0l-1.23.09A25.06,25.06,0,0,0,36.43,57.16V406.74H823.58V57.16A25,25,0,0,0,799.87,32ZM247.3,279c-26,0-47-21.34-47-47.68s21.05-47.67,47-47.67,47,21.35,47,47.67S273.27,279,247.3,279Zm363.19,0c-26,0-47-21.34-47-47.68s21-47.67,47-47.67,47,21.35,47,47.67S636.46,279,610.49,279Z"
            />
            <path
              class="b"
              d="M839.27,0H20.72A20.87,20.87,0,0,0,0,21V529a20.87,20.87,0,0,0,20.72,21H839.27A20.88,20.88,0,0,0,860,529V21A20.88,20.88,0,0,0,839.27,0ZM823.58,406.74H36.26V57.16A25,25,0,0,1,58.74,32.1L60,32c.37,0,.74,0,1.12,0h737.5c.43,0,.85,0,1.28,0a25,25,0,0,1,23.71,25.15Z"
            />
          </svg>
          <div className=" tape-con">
            <img
              src={songs[songIndex].img}
              className="tape"
              alt={`${songs[songIndex].subtitle}`}
            />
            <audio ref={control} src={songs[songIndex].src}></audio>
          </div>
          <svg viewBox="0 0 860 550" className="tape-up">
            <path
              class="c"
              d="M610.49,169.71H247.3c-33.56,0-60.76,27.59-60.76,61.61s27.2,61.62,60.76,61.62H610.49c33.56,0,60.76-27.58,60.76-61.62S644.05,169.71,610.49,169.71ZM247.3,279c-26,0-47-21.34-47-47.68s21.05-47.67,47-47.67,47,21.35,47,47.67S273.27,279,247.3,279Zm281-16.93H331.66V199.4H528.34ZM610.49,279c-26,0-47-21.34-47-47.68s21-47.67,47-47.67,47,21.35,47,47.67S636.46,279,610.49,279Z"
            />
          </svg>
          <div className="tape-down">
            <p className="tape-down-label">COZY DESK</p>
            <div className="tape-down-circle left"></div>
            <div className="tape-down-circle-sm "></div>
            <div className="tape-down-square left"></div>
            <div className="tape-down-circle right"></div>
            <div className="tape-down-circle-sm  right"></div>
            <div className="tape-down-square right"></div>
          </div>
        </div>
        <div className="tape-play">
          <div className="tape-content">
            <div className="tape-detail">
              <p class="song-title font-style-prata ">
                {songs[songIndex].title}
              </p>
              <p class="song-subtitle">{songs[songIndex].subtitle}</p>
            </div>
            <div className="play-icons">
              <button className=" play-icon" onClick={pre}>
                <img src="/images/px-05.png" alt="CD" />
              </button>
              {isplaying ? (
                <button className="play-icon" onClick={stop}>
                  <img src="/images/px-03.png" alt="CD" />
                </button>
              ) : (
                <button className="play-icon" onClick={play}>
                  <img src="/images/px-02.png" alt="CD" />
                </button>
              )}
              <button className=" play-icon" onClick={next}>
                <img src="/images/px-04.png" alt="CD" />
              </button>
              <button className="action-loop play-icon">
                <img src="/images/px-01.png" alt="CD" />
              </button>
            </div>
            <div className="progress-con">
              <div className="progress"></div>
              <div className="progress-time-label">
                <p> 00:00:00</p>
                <p>01:12:12</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Music;
