import React, { useState } from "react";
import Desk from "../desk/Desk";
// import SignWindowCopy from "../member/SignWindowCopy";
import SignWindow from "../member/SignWindow";

const MainBody = ({ userState, setUserstate, setShowWindow, showWindow }) => {
  // const [mousePositon, setMousePositon] = useState({});

  console.log(showWindow);
  return (
    <div className="main-body">
      {showWindow.SignWindow.display ? (
        <SignWindow
          userState={userState}
          setUserstate={setUserstate}
          showWindow={showWindow}
          setShowWindow={setShowWindow}
        />
      ) : null}
      {showWindow.Desk.display ? (
        <Desk showWindow={showWindow} setShowWindow={setShowWindow} />
      ) : null}
    </div>
  );
};

export default MainBody;
