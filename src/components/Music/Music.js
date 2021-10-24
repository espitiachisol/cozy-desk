import React, { useState, useCallback, useRef, useEffect } from "react";
import useDrag from "../hooks/useDrag";
import WindowHeader from "../shared/WindowHeader/WindowHeader";
import "./Music.css";
import { firestore } from "../../firebaseConfig";
//Components
import PlayList from "./PlayList";
import SettingBar from "../shared/SettingBar/SettingBar";
import SquareIconBtn from "../shared/SquareIconBtn/SquareIconBtn";
import RetroTape from "./MusicItems/RetroTape";
import MusicListLabels from "./MusicItems/MusicListLabels";
import AddSongsForm from "./MusicItems/AddSongsForm";
//Helpers
import { defaultSongs } from "../../utils/constants/defaultSongs";
import { getHourMinuteSecondString } from "../../utils/helpers/time.helper";
import { randomNum } from "../../utils/helpers/random.helper";
//api
import {
  PUTstorage,
  GETurlstorage,
  DELETEstorage,
} from "../../api/storage.api";

const Music = function ({
  setShowWindow,
  showWindow,
  zIndex,
  setZIndex,
  userState,
  setNotification,
}) {
  const control = useRef(null);
  const fileRef = useRef(null);
  const [size, setSize] = useState({});
  const [startPositon, setStartPositon] = useState({});
  const [songIndex, setSongIndex] = useState(0);
  const [isplaying, setIsplaying] = useState(false);
  const [rotate, setRotate] = useState("");
  //如果duration設定為0,下面的運算(progress.currentTime * 1) / progress.duration} 會是NaN% 因為0/0= NaN 設定為1,0/1=0
  const [progress, setProgress] = useState({ currentTime: 0, duration: 1 });
  const [loopOneSong, setLoopOneSong] = useState(false);
  const [volume, setVolume] = useState(1);
  const [musicListsShow, setMusicListsShow] = useState(false);
  const [userAddLists, setUserAddLists] = useState(false);
  const [songFromData, setSongFromData] = useState([]);
  const [songs, setSongs] = useState(defaultSongs);
  const [currentPlaylistType, setCurrentPlaylistType] = useState("default");
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (isplaying && songs) {
      setIsplaying(true);
      setRotate("play");
      control.current.play();
    }
  }, [songIndex, isplaying, songs]);
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
            setSongFromData([...doc.data().mixtape]);
          }
        })
        .catch((error) => {
          setNotification({
            title: error?.code,
            content: error?.message,
          });
          // console.log("Error getting document:", error);
        });
    }
    return () => {
      setSongFromData([]);
    };
  }, [userState, setNotification]);

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
          }
        })
        .catch((error) => {
          setNotification({
            title: error?.code,
            content: error?.message,
          });
          // console.log("Error getting document:", error);
        });
    }
  }, [userAddLists, userState, setNotification]);

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
    defaultX: parseInt(showWindow.Music.x, 10) || 20,
    defaultY: parseInt(showWindow.Music.y, 10) || 0,
  };

  const [position, mouseDown] = useDrag(startingPosition);
  //操作音樂播放
  const play = useCallback(() => {
    // control.current.load();
    setIsplaying(true);
    setRotate("play");
    control.current.play();
  }, []);
  const stop = useCallback(() => {
    setIsplaying(false);
    setRotate("");
    control.current.pause();
  }, []);
  const pre = useCallback(() => {
    songIndex === 0
      ? setSongIndex(songs.length - 1)
      : setSongIndex(songIndex - 1);
  }, [songIndex, songs]);

  const clickProgressBar = (e) => {
    if (
      !e.target.parentElement.classList.contains("progress-time-label") &&
      progress.duration
    ) {
      let currentTime = (e.nativeEvent.offsetX / 360) * progress.duration;
      setProgress({
        ...progress,
        currentTime: currentTime,
      });
      control.current.currentTime = currentTime;
    }
  };
  const next = () => {
    // FIXME:當在播放後面的音樂，刪除前面的index的話會出錯誤，目前先以?.去做處理但會有問題！
    //當歌單只有一首歌的時候setSongIndex(0)會沒有改變所以上面的useEffect不會被觸法
    if (songs.length === 1) {
      play();
    } else {
      songIndex === songs.length - 1
        ? setSongIndex(0)
        : setSongIndex(songIndex + 1);
    }
  };

  const toggleLoopOneSong = useCallback(() => {
    setLoopOneSong(!loopOneSong);
  }, [loopOneSong]);

  const uploadFiles = (e) => {
    let array = [];
    //把當前上傳的資料放到雲端storage和firestore
    e.preventDefault();
    const files = e.target[0].files;
    if (files.length + songFromData.length > 10) {
      setNotification({
        title: "Notification/The number of songs is limited to 10",
        content: `You can only add "${10 - songFromData.length}" more songs. `,
      });
      fileRef.current.value = null;
    } else if (files.length > 0) {
      setShowLoading(true);
      //多個檔案,loop 每個要上傳的檔案
      Object.entries(files).forEach(([key, value]) => {
        //存入storage
        if (value.size < 10000000) {
          PUTstorage(`${userState}/${value.name}`, value).then((snapshot) => {
            //取得storage
            GETurlstorage(`${userState}/${value.name}`)
              .then((url) => {
                let imgNum = randomNum(5, 9);
                array.push({
                  id: `${userState}/${value.name}`,
                  title: value.name,
                  src: url,
                  img: `/images/mixtape-cover-${imgNum}.png`,
                  icon: `/images/tape-icons-${imgNum}.png`,
                });
                //將取得的storage url 放入firestore
                firestore
                  .collection("mixtape")
                  .doc(userState)
                  .set({
                    mixtape: [...songFromData, ...array],
                  })
                  .then(() => {
                    setUserAddLists(true);
                    setShowLoading(false);
                    fileRef.current.value = null;
                  })
                  .catch((error) => {
                    setNotification({
                      title: error?.code,
                      content: error?.message,
                    });
                  });
              })
              .catch((error) => {
                setNotification({
                  title: error?.code,
                  content: error?.message,
                });
              });
          });
        } else {
          setNotification({
            title: "Notification/The song size is limited to 10MB",
            content: `${value.name
              .slice(0, 20)
              .padEnd(
                23,
                "."
              )}, This song has exceeded the song size limit ,will not be uploaded.  `,
          });
          setShowLoading(false);
          fileRef.current.value = null;
        }
      });
    } else {
      setNotification({
        title: "Notification",
        content: "No files chosen! Please, choose files!",
      });
    }
  };

  const deletePlayList = (id) => {
    //刪除storage資料
    DELETEstorage(id)
      .then(() => {
        // console.log("Document successfully delete from storage");
      })
      .catch((error) => {
        setNotification({
          title: error?.code,
          content: error?.message,
        });
        console.error("Error Deleting document from storage: ", error);
      });
    //更新firestore資料
    let filteredArray = songFromData.filter((song) => song.id !== id);

    // console.log(filteredArray);
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
        // console.log("Document successfully  delete from firestore !!!");
      })
      .catch((error) => {
        setNotification({
          title: error?.code,
          content: error?.message,
        });
        console.error("Error writing document: ", error);
      });
  };
  // 刪除檔案時songFromData會更新，假如目前在播放的清單是user自建清單，會重新設定播放中的清單
  useEffect(() => {
    //假如目前播放的音樂"不是"default音樂
    if (!songs[0].id.includes("default")) {
      if (songFromData.length > 0) {
        // console.log("3", songFromData);
        setSongs(songFromData);
      } else {
        setSongs(defaultSongs);
      }
    }
  }, [songFromData, songs]);

  return (
    <div
      className="music window"
      ref={curWindow}
      style={{ top: position.y, left: position.x, zIndex: zIndex.Music }}
      onMouseDown={() => {
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
        position={position}
        label="Mixtape"
      />

      <div className="tape-container-all">
        <RetroTape
          rotate={rotate}
          progress={progress}
          coverImg={songs[songIndex]}
        />
        <audio
          ref={control}
          src={songs[songIndex]?.src}
          onCanPlay={(e) => {
            const { currentTime, duration } = e.target;
            setProgress({ currentTime: currentTime, duration: duration });
          }}
          onTimeUpdate={(e) => {
            const { currentTime, duration } = e.target;
            if (currentTime === duration) {
              //若有單曲循環的話
              if (loopOneSong) {
                control.current.load();
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
        <div className="tape-play">
          <div className="tape-content">
            <div className="tape-detail">
              <p className="song-title font-style-prata ">
                {songs[songIndex]?.title}
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
              <SquareIconBtn
                ClickSquareIconBtn={pre}
                imageSrc="/images/icon_pre.svg"
                imageAlt="icon pre"
                btnClassName="play-icon"
              />
              {isplaying ? (
                <SquareIconBtn
                  ClickSquareIconBtn={stop}
                  imageSrc="/images/icon_stop.svg"
                  imageAlt="icon stop"
                  btnClassName="play-icon"
                />
              ) : (
                <SquareIconBtn
                  ClickSquareIconBtn={play}
                  imageSrc="/images/icon_play.svg"
                  imageAlt="icon play"
                  btnClassName="play-icon"
                />
              )}
              <SquareIconBtn
                ClickSquareIconBtn={next}
                imageSrc="/images/icon_next.svg"
                imageAlt="icon next"
                btnClassName="play-icon"
              />
              <SquareIconBtn
                ClickSquareIconBtn={toggleLoopOneSong}
                imageSrc="/images/icon_loop.svg"
                imageAlt="icon loop"
                btnClassName={`play-icon ${loopOneSong ? "action-loop" : ""}`}
              />
            </div>
            <div className="progress-con" onClick={clickProgressBar}>
              <div
                className="progress"
                style={{
                  width: `${(progress.currentTime * 100) / progress.duration}%`,
                }}
              ></div>
              <div className="progress-time-label">
                <p>{getHourMinuteSecondString(progress.currentTime)}</p>
                <p>{getHourMinuteSecondString(progress.duration)}</p>
              </div>
            </div>
          </div>
          <div className="music-lists-all">
            <SettingBar
              setMore={setMusicListsShow}
              more={musicListsShow}
              label={"Playlists"}
            />

            {musicListsShow ? (
              <MusicListLabels
                currentPlaylistType={currentPlaylistType}
                setCurrentPlaylistType={setCurrentPlaylistType}
              />
            ) : null}
            <div
              className="music-lists-container"
              style={{
                maxHeight: `${musicListsShow ? 200 : 0}px`,
              }}
            >
              <div
                className="music-lists"
                style={{
                  display: `${musicListsShow ? "flex" : "none"}`,
                }}
              >
                <PlayList
                  songs={
                    currentPlaylistType === "user" ? songFromData : defaultSongs
                  }
                  setSongs={setSongs}
                  setSongIndex={setSongIndex}
                  currentPlaylistType={currentPlaylistType}
                  deletePlayList={deletePlayList}
                  userState={userState}
                />
              </div>
              {currentPlaylistType === "user" && musicListsShow ? (
                <AddSongsForm
                  userState={userState}
                  uploadFiles={uploadFiles}
                  fileRef={fileRef}
                  showLoading={showLoading}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Music;
