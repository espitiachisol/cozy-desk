import React from "react";
import Desk from "../desk/Desk";
import Music from "../Music/Music";
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
      <div>
        <img src="/images/test-02.png" className="test" alt="test" />
      </div>
    </div>
  );
};

export default MainBody;
