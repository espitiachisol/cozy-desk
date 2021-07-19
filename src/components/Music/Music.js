import React, { useState, useCallback, useRef, useEffect } from "react";
import useDrag from "../hooks/useDrag";
import WindowHeader from "../windowHeader/WindowHeader";
import "./Music.css";

const songs = [
  {
    id: "defaultSong01",
    title: "Focus",
    subtitle: "Soft Piano Music for Reading",
    src: "/music/02.mp3",
    img: "/images/mixtape-cover-1.png",
    icon: "/images/tape-icons-1.png",
  },
  {
    id: "defaultSong02",
    title: "Piano",
    subtitle: "Yiruma's Greatest Hits",
    src: "/music/03.mp3",
    img: "/images/mixtape-cover-2.png",
    icon: "/images/tape-icons-2.png",
  },
  {
    id: "defaultSong03",
    title: "Rock Songs",
    subtitle: "Best Rock Hits of the 2000's",
    src: "/music/04.mp3",
    img: "/images/mixtape-cover-3.png",
    icon: "/images/tape-icons-3.png",
  },
  {
    id: "defaultSong04",
    title: "Love Songs",
    subtitle: "Music that bring back to old days.",
    src: "/music/05.mp3",
    img: "/images/mixtape-cover-4.png",
    icon: "/images/tape-icons-4.png",
  },
];

const Music = ({ setShowWindow, showWindow, zIndex, setZIndex }) => {
  const control = useRef(null);
  const [size, setSize] = useState({});
  const [startPositon, setStartPositon] = useState({});
  const [songIndex, setSongIndex] = useState(0);
  const [isplaying, setIsplaying] = useState(false);
  const [rotate, setRotate] = useState("");
  const [tapeOnReel, setTapeOnReel] = useState(false);
  const [progress, setProgress] = useState({ currentTime: 0, duration: 100 });
  //如果duration設定為0,下面的運算(progress.currentTime * 100) / progress.duration} 會是NaN% 因為0/0= NaN 設定為100,0/100=0
  const [musicLists, setMusicLists] = useState(false);
  useEffect(() => {
    if (isplaying) {
      setIsplaying(true);
      setRotate("play");
      control.current.play();
    }
  }, [songIndex, isplaying]);

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
    setIsplaying(true);
    setRotate("play");
    control.current.play();
  };
  const stop = () => {
    setIsplaying(false);
    setRotate("");
    control.current.pause();
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
        label="Mixtape"
      />

      <div className="tape-container-all">
        <div className={`tape ${rotate}`}>
          <svg viewBox="0 0 860 550">
            <path
              className="a"
              d="M799.87,32c-.43,0-.85,0-1.28,0H61.09c-.38,0-.75,0-1.12,0l-1.23.09A25.06,25.06,0,0,0,36.43,57.16V406.74H823.58V57.16A25,25,0,0,0,799.87,32ZM247.3,279c-26,0-47-21.34-47-47.68s21.05-47.67,47-47.67,47,21.35,47,47.67S273.27,279,247.3,279Zm363.19,0c-26,0-47-21.34-47-47.68s21-47.67,47-47.67,47,21.35,47,47.67S636.46,279,610.49,279Z"
            />
            <path
              className="b"
              d="M839.27,0H20.72A20.87,20.87,0,0,0,0,21V529a20.87,20.87,0,0,0,20.72,21H839.27A20.88,20.88,0,0,0,860,529V21A20.88,20.88,0,0,0,839.27,0ZM823.58,406.74H36.26V57.16A25,25,0,0,1,58.74,32.1L60,32c.37,0,.74,0,1.12,0h737.5c.43,0,.85,0,1.28,0a25,25,0,0,1,23.71,25.15Z"
            />
          </svg>
          <div
            className="tape-con left"
            style={{
              clipPath: `circle(${
                120 - (progress.currentTime * 100) / progress.duration
              }px at center)`,
            }}
          >
            <img
              src="/images/mixtape-11.png"
              className="tape"
              alt="tape on reel left"
            />
          </div>

          <div
            className="tape-con right"
            style={{
              clipPath: `circle(${
                20 + (progress.currentTime * 100) / progress.duration
              }px at center)`,
            }}
          >
            <img
              src="/images/mixtape-11.png"
              className="tape"
              alt="tape on reel right"
            />
          </div>

          <audio
            ref={control}
            src={songs[songIndex].src}
            onTimeUpdate={(e) => {
              const { currentTime, duration } = e.target;
              setProgress({ currentTime: currentTime, duration: duration });
            }}
          ></audio>
          <svg viewBox="0 0 860 550" className="tape-up">
            <path
              className="c"
              d="M610.49,169.71H247.3c-33.56,0-60.76,27.59-60.76,61.61s27.2,61.62,60.76,61.62H610.49c33.56,0,60.76-27.58,60.76-61.62S644.05,169.71,610.49,169.71ZM247.3,279c-26,0-47-21.34-47-47.68s21.05-47.67,47-47.67,47,21.35,47,47.67S273.27,279,247.3,279Zm281-16.93H331.66V199.4H528.34ZM610.49,279c-26,0-47-21.34-47-47.68s21-47.67,47-47.67,47,21.35,47,47.67S636.46,279,610.49,279Z"
            />
          </svg>

          <div className="tape-cover">
            <img
              src={songs[songIndex].img}
              alt="cover"
              style={{ opacity: `${tapeOnReel ? "0.9" : "0.2"}` }}
            />
          </div>

          <div className="tape-down">
            <div className="tape-down-label">
              <p>COZY DESK</p>
              <button
                onClick={() => {
                  setTapeOnReel(!tapeOnReel);
                }}
              >
                '' Click ''
              </button>
            </div>

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
              <p className="song-title font-style-prata ">
                {songs[songIndex].title}
              </p>
              <p className="song-subtitle">{songs[songIndex].subtitle}</p>
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
            <div
              className="progress-con"
              onClick={(e) => {
                setProgress({
                  ...progress,
                  currentTime:
                    (e.nativeEvent.offsetX / 360) * progress.duration,
                });
                control.current.currentTime =
                  (e.nativeEvent.offsetX / 360) * progress.duration;
              }}
            >
              <div
                className="progress"
                style={{
                  width: `${(progress.currentTime * 100) / progress.duration}%`,
                }}
              ></div>
              <div className="progress-time-label">
                <p> 00:00:00</p>
                <p>01:12:12</p>
              </div>
            </div>
          </div>
          <div className="music-lists-all">
            <div className="music-lists-btn-con">
              <button
                onClick={() => {
                  setMusicLists(!musicLists);
                }}
              >
                Music list <span>&#9660;</span>
              </button>
            </div>
            <div
              className="music-lists"
              style={{ height: `${musicLists ? 200 : 0}px` }}
            >
              {musicLists
                ? songs.map((list, index) => {
                    return (
                      <div
                        key={list.id}
                        className="music-list"
                        onClick={() => {
                          setSongIndex(index);
                        }}
                      >
                        <img src={list.icon} alt={list.title} />
                        <p>{list.title}</p>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Music;
