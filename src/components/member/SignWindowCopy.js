import React, { useState, useCallback } from "react";
import Sign from "./Sign";

const SignWindow = ({ userState, setUserstate, setShowWindow }) => {
  const [x, setX] = useState("100px");
  const [y, setY] = useState("100px");
  // const [startX, setStartX] = useState(0);
  // const [startY, setStartY] = useState(0);
  const [size, setSize] = useState({});
  const [SignInShow, setSignInShow] = useState(true);
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
  let startX = 0;
  let startY = 0;
  const { innerHeight, innerWidth } = window;
  const move = (e) => {
    let x = e.clientX - startX;
    let y = e.clientY - startY;
    x = Math.max(Math.min(x, innerWidth - size.width), 0);
    y = Math.max(Math.min(y, innerHeight - 40 - size.height), 0);
    setX(`${x}px`);
    setY(`${y}px`);
    setStartPositon({ x: x, y: y });
  };
  const stop = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", stop);
  };
  const DragStart = (e) => {
    e.preventDefault();
    startX = e.clientX - startPositon.x;
    startY = e.clientY - startPositon.y;
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
  };

  return (
    <div className="window" ref={curWindow} style={{ top: y, left: x }}>
      <div className="window-header" id="sign" onMouseDown={DragStart}>
        <i
          className="close-window pointer"
          onClick={() => {
            setShowWindow(false);
          }}
        >
          &times;
        </i>
      </div>
      <div className="window-body">
        <Sign
          userState={userState}
          setUserstate={setUserstate}
          SignInShow={SignInShow}
        />

        <div
          onClick={() => {
            setSignInShow(!SignInShow);
          }}
        >
          {SignInShow ? (
            <p>
              doesn't have an account
              <button className="pointer"> Signup</button>
            </p>
          ) : (
            <p>
              already have an acoount{" "}
              <button className="pointer">Singin</button>
            </p>
          )}
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="window" ref={curWindow}>
  //     <div
  //       className="window-header"
  //       id="sign"
  //       style={{ display: "block", padding: "6px" }}
  //     >
  //       <i
  //         onClick={() => {
  //           setShowWindow(false);
  //         }}
  //       >
  //         X
  //       </i>
  //     </div>
  //     <div className="window-body">
  //       <Sign
  //         userState={userState}
  //         setUserstate={setUserstate}
  //         SignInShow={SignInShow}
  //       />

  //       <div
  //         onClick={() => {
  //           setSignInShow(!SignInShow);
  //         }}
  //       >
  //         {SignInShow ? (
  //           <p>
  //             doesn't have an account<button> Signup</button>
  //           </p>
  //         ) : (
  //           <p>
  //             already have an acoount <button>Singin</button>
  //           </p>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default SignWindow;
