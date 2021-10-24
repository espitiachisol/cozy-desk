import React from "react";
const EachIcon = function ({
  setShowWindow,
  showWindow,
  setZIndex,
  zIndex,
  label,
  iconImg,
}) {
  const witchWindowToShow = () => {
    switch (label) {
      case "Tomato":
        setShowWindow({
          ...showWindow,
          Tomato: {
            display: true,
            x: showWindow.Tomato.x,
            y: showWindow.Tomato.y,
          },
        });
        if (zIndex.curW !== "Tomato") {
          setZIndex({
            ...zIndex,
            Tomato: zIndex.cur,
            cur: zIndex.cur + 1,
            curW: "Tomato",
          });
        }
        return;
      case "Mixtape":
        setShowWindow({
          ...showWindow,
          Music: {
            display: true,
            x: showWindow.Music.x,
            y: showWindow.Music.y,
          },
        });
        if (zIndex.curW !== "Music") {
          setZIndex({
            ...zIndex,
            Music: zIndex.cur,
            cur: zIndex.cur + 1,
            curW: "Music",
          });
        }
        return;
      case "Todo":
        setShowWindow({
          ...showWindow,
          Todo: {
            display: true,
            x: showWindow.Todo.x,
            y: showWindow.Todo.y,
          },
        });
        if (zIndex.curW !== "Todo") {
          setZIndex({
            ...zIndex,
            Todo: zIndex.cur,
            cur: zIndex.cur + 1,
            curW: "Todo",
          });
        }
        return;
      default:
        return;
    }
  };
  return (
    <div
      className="each-icon"
      onClick={() => {
        witchWindowToShow();
      }}
    >
      <img className="desk-icon" src={iconImg} alt={label} />
      <p>{label}</p>
    </div>
  );
};
export default EachIcon;
