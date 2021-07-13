import React from "react";
import Desk from "../desk/Desk";
import Music from "../Music/Music";
import Tomato from "../Tomato/Tomato";
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
  // const [mousePositon, setMousePositon] = useState({});

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
      {showWindow.Desk.display ? (
        <Desk
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
      <div className="icon-con">
        <div
          className="each-icon"
          onClick={() => {
            setShowWindow({ ...showWindow, Desk: { display: true } });
          }}
        >
          <img
            className="desk-icon"
            src="/images/icon-desk.png"
            alt="icon-desk"
          />
          <p>Desk </p>
        </div>
      </div>
      <div className="test">
        <img
          src="/images/tomato-09.png"
          alt="tomato"
          style={{ width: "350px" }}
        />
      </div>
    </div>
  );
};

export default MainBody;
