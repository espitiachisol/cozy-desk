import { useState } from "react";

const useDrag = (startingPosition) => {
  const { innerHeight, innerWidth } = window;
  const [x, setX] = useState(`${startingPosition.defaultX}px`);
  const [y, setY] = useState(`${startingPosition.defaultY}px`);

  const [xxyy, setxxyy] = useState({});
  let xx, yy;
  let startX = 0;
  let startY = 0;

  const move = (e) => {
    let x = e.clientX - startX;
    let y = e.clientY - startY;
    x = Math.max(Math.min(x, innerWidth - startingPosition.width), 0);
    y = Math.max(Math.min(y, innerHeight - 40 - startingPosition.height), 0);
    setX(`${x}px`);
    setY(`${y}px`);
    setxxyy({ xx: x, yy: y });
  };

  const stop = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", stop);
  };
  const mouseDown = (e) => {
    if (xxyy.xx === undefined && xxyy.yy === undefined) {
      xx = startingPosition.x;
      yy = startingPosition.y;
      setxxyy({ xx: xx, yy: yy });
    } else {
      xx = xxyy.xx;
      yy = xxyy.yy;
    }
    e.preventDefault();
    startX = e.clientX - xx;
    startY = e.clientY - yy;

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
  };
  const position = {
    x: x,
    y: y,
  };
  return [position, mouseDown];
};
export default useDrag;
