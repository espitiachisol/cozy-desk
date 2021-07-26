import React, { useState, useCallback, useRef, useEffect } from "react";
import useDrag from "../hooks/useDrag";
import WindowHeader from "../windowHeader/WindowHeader";
import "./Music.css";
import { storage, firestore } from "../../firebaseConfig";
import PlayList from "./PlayList";

const calcDisplayFullTime = (time) => {
  if (time) {
    let hour = Math.floor(time / 60 / 60);
    let sec = Math.floor(time % 60);
    let min = Math.floor(time / 60) - hour * 60;
    return (
      hour.toString().padStart(2, "0") +
      ":" +
      min.toString().padStart(2, "0") +
      ":" +
      sec.toString().padStart(2, "0")
    );
  } else {
    return "00:00:00";
  }
};
const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const Music = ({ setShowWindow, showWindow, zIndex, setZIndex, userState }) => {
  const control = useRef(null);
  const [size, setSize] = useState({});
  const [startPositon, setStartPositon] = useState({});
  const [songIndex, setSongIndex] = useState(0);
  const [isplaying, setIsplaying] = useState(false);
  const [rotate, setRotate] = useState("");
  const [tapeOnReel, setTapeOnReel] = useState(true);
  //如果duration設定為0,下面的運算(progress.currentTime * 1) / progress.duration} 會是NaN% 因為0/0= NaN 設定為1,0/1=0
  const [progress, setProgress] = useState({ currentTime: 0, duration: 1 });
  const [loopOneSong, setLoopOneSong] = useState(false);
  const [volume, setVolume] = useState(1);
  const [musicListsShow, setMusicListsShow] = useState(false);
  const [userAddLists, setUserAddLists] = useState(false);
  const [songFromData, setSongFromData] = useState([]);
  const [defaultSongs, setDefaultSongs] = useState([
    {
      id: "defaultSong01",
      title: "Focus-Soft Piano Music for Reading",
      src: "/music/02.mp3",
      img: "/images/mixtape-cover-1.png",
      icon: "/images/tape-icons-1.png",
    },
    {
      id: "defaultSong02",
      title: "Piano-Yiruma's Greatest Hits",
      src: "/music/03.mp3",
      img: "/images/mixtape-cover-2.png",
      icon: "/images/tape-icons-2.png",
    },
    {
      id: "defaultSong03",
      title: "Rock Songs-Best Rock Hits of the 2000's",
      src: "/music/04.mp3",
      img: "/images/mixtape-cover-3.png",
      icon: "/images/tape-icons-3.png",
    },
    {
      id: "defaultSong04",
      title: "Love Songs-Music that bring back to old days.",
      src: "/music/05.mp3",
      img: "/images/mixtape-cover-4.png",
      icon: "/images/tape-icons-4.png",
    },
  ]);
  const [songs, setSongs] = useState(defaultSongs);
  const [currentPlaylistType, setCurrentPlaylistType] = useState("default");
  // console.log(currentPlaylistType);
  useEffect(() => {
    if (isplaying) {
      setIsplaying(true);
      setRotate("play");
      control.current.play();
    }
  }, [songIndex, isplaying]);
  //volume被調整後設定audio音量
  useEffect(() => {
    control.current.volume = volume;
  }, [volume]);
  //確定使用者是登入的狀態，若是登入的狀態向firestore要使用者的歌單，放入SongFromData裡
  useEffect(() => {
    if (userState) {
      firestore
        .collection("mixtape")
        .doc(userState)
        .get()
        .then((doc) => {
          if (doc.exists) {
            //假如沒有data會出現  doc.data.mixtape is not iterable FIXME:
            // console.log("Document data:", doc.data());
            setSongFromData([...doc.data().mixtape]);
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  }, [userState]);
  //假如 SongFromData有更新，或是有內容，設定目前顯示的音樂
  useEffect(() => {
    if (songFromData.length > 0) {
      console.log("setsongEfect");
      //set display song ""defalut "" and song from firestore
      if (currentPlaylistType === "user") {
        setSongs([...songFromData]);
      } else {
        setSongs([...defaultSongs]);
      }
    } else {
      if (currentPlaylistType === "user") {
        setSongs([...defaultSongs]);
      } else {
        setSongs([...defaultSongs]);
      }
    }
  }, [songFromData, currentPlaylistType]);
  //假如使用者新增新的音樂清單，再向firestore要一次新的資料，將新的資料放入SongFromData
  useEffect(() => {
    if (userAddLists && userState) {
      firestore
        .collection("mixtape")
        .doc(userState)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setSongFromData([...doc.data().mixtape]);
            setUserAddLists(false);
            console.log("setSongFromDataEffect");
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  }, [userAddLists, userState]);
  // console.log("song from data----", songFromData);
  // console.log("songs----", songs);

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
    defaultX: 550,
    defaultY: 20,
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
  let array = [];
  const uploadFiles = (e) => {
    console.log(e);
    //把當前上傳的資料放到雲端storage和firestore
    e.preventDefault();
    const files = e.target[0].files;
    //多個檔案,loop 每個要上傳的檔案
    Object.entries(files).forEach(([key, value]) => {
      //存入storage
      storage
        .ref()
        .child(`${userState}/${value.name}`)
        .put(value)
        .then((snapshot) => {
          //取得storage
          storage
            .ref()
            .child(`${userState}/${value.name}`)
            .getDownloadURL()
            .then((url) => {
              let imgNum = randomNum(5, 9);

              array.push({
                id: `${userState}/${value.name}`,
                title: value.name,
                src: url,
                img: `/images/mixtape-cover-${imgNum}.png`,
                icon: `/images/tape-icons-${imgNum}.png`,
              });
              console.log("Uploaded a file!");

              console.log([...array]);
              //將取得的storage url 放入firestore
              firestore
                .collection("mixtape")
                .doc(userState)
                .set({
                  mixtape: [...songFromData, ...array],
                })
                .then(() => {
                  setUserAddLists(true);
                  array = [];
                  console.log("Document successfully updte!!!");
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                });
            });
        });
    });
  };
  const deletePlayList = (id) => {
    //刪除storage資料
    storage
      .ref()
      .child(id)
      .delete()
      .then(() => {
        console.log("Document successfully delete from storage");
        //更新firestore資料
        let filteredArray = songFromData.filter((song) => song.id !== id);
        console.log(filteredArray);
        firestore
          .collection("mixtape")
          .doc(userState)
          .set({
            mixtape: [...filteredArray],
          })
          .then(() => {
            //更新SongFromData
            setUserAddLists(true);
            filteredArray = [];
            console.log("Document successfully  delete from firestore !!!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      })
      .catch((error) => {
        console.error("Error Deleting document from storage: ", error);
      });
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
              src="/images/mixtape-tape-on-reel.png"
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
              src="/images/mixtape-tape-on-reel.png"
              className="tape"
              alt="tape on reel right"
            />
          </div>

          <audio
            ref={control}
            src={songs[songIndex].src}
            onTimeUpdate={(e) => {
              const { currentTime, duration } = e.target;
              if (currentTime === duration) {
                //若有單曲循環的話
                if (loopOneSong) {
                  control.current.currentTime = 0;
                  play();
                } else {
                  //沒有自動播放下一首
                  next();
                }
              } else {
                setProgress({ currentTime: currentTime, duration: duration });
              }
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
            </div>
            <div className="play-icons">
              <div className="volume-slider-con">
                <img
                  src={`/images/icon_${volume === 0 ? "mute" : "volume"}.svg`}
                  alt="icon volume"
                  className="icon-volume"
                />
                <input
                  className="volume-slider"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={volume * 100}
                  onChange={(e) => {
                    setVolume(parseInt(e.target.value, 10) * 0.01);
                  }}
                ></input>
              </div>
              <button className=" play-icon" onClick={pre}>
                <img src="/images/icon_pre.svg" alt="icon pre" />
              </button>
              {isplaying ? (
                <button className="play-icon" onClick={stop}>
                  <img src="/images/icon_stop.svg" alt="icon stop" />
                </button>
              ) : (
                <button className="play-icon" onClick={play}>
                  <img src="/images/icon_play.svg" alt="icon play" />
                </button>
              )}
              <button className="play-icon" onClick={next}>
                <img src="/images/icon_next.svg" alt="icon next" />
              </button>
              <button
                className={`play-icon ${loopOneSong ? "action-loop" : ""}`}
                onClick={() => {
                  setLoopOneSong(!loopOneSong);
                }}
              >
                <img src="/images/icon_loop.svg" alt="icon loop" />
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
                <p>{calcDisplayFullTime(progress.currentTime)}</p>
                <p>{calcDisplayFullTime(progress.duration)}</p>
              </div>
            </div>
          </div>
          <div className="music-lists-all">
            <div className="music-lists-btn-con">
              <button
                onClick={() => {
                  setMusicListsShow(!musicListsShow);
                }}
              >
                Playlist <span>&#9660;</span>
              </button>
            </div>
            {musicListsShow ? (
              <div className="toggle-playList-con">
                <button
                  className={`${
                    currentPlaylistType === "default" ? "active" : ""
                  }`}
                  onClick={() => {
                    setCurrentPlaylistType("default");
                  }}
                >
                  Mixtape
                </button>
                <button
                  className={`${
                    currentPlaylistType === "user" ? "active" : ""
                  }`}
                  onClick={() => {
                    setCurrentPlaylistType("user");
                  }}
                >
                  My Playlist
                </button>
              </div>
            ) : null}
            <div className="music-lists-container">
              <div
                className="music-lists"
                style={{
                  height: `${musicListsShow ? 220 : 0}px`,
                }}
              >
                <PlayList
                  songs={songs}
                  setSongIndex={setSongIndex}
                  currentPlaylistType={currentPlaylistType}
                  deletePlayList={deletePlayList}
                />
              </div>
              {currentPlaylistType === "user" && musicListsShow ? (
                <form
                  method="post"
                  encType="multipart/form-data"
                  className="add-music"
                  onSubmit={(e) => {
                    uploadFiles(e);
                  }}
                >
                  <input type="file" accept="audio/*" multiple></input>

                  <button type="submit">Add songs</button>
                </form>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Music;

// var mountainImagesRef = storage.ref().child("images/welcome.jpg").put("../public/images/welcome.jpg").then((snapshot) => {
//   console.log("Uploaded a raw string!");
// });
//TODO:阻擋沒登入的使用者按上傳檔案
