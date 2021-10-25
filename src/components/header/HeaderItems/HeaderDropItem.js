import React from "react";
const HeaderDropItem = function ({
  setShowWindow,
  showWindow,
  setZIndex,
  zIndex,
  label,
}) {
  const witchWindowToShow = (label) => {
    switch (label) {
      case "Sign":
        setShowWindow({
          ...showWindow,
          signWindow: {
            display: true,
            x: showWindow.signWindow.x,
            y: showWindow.signWindow.y,
          },
        });
        if (zIndex.curW !== "signWindow") {
          setZIndex({
            ...zIndex,
            signWindow: zIndex.cur,
            cur: zIndex.cur + 1,
            curW: "signWindow",
          });
        }
        return;
      case "Tomato":
        setShowWindow({
          ...showWindow,
          tomato: {
            display: true,
            x: showWindow.tomato.x,
            y: showWindow.tomato.y,
          },
        });
        if (zIndex.curW !== "tomato") {
          setZIndex({
            ...zIndex,
            tomato: zIndex.cur,
            cur: zIndex.cur + 1,
            curW: "tomato",
          });
        }
        return;
      case "Mixtape":
        setShowWindow({
          ...showWindow,
          music: {
            display: true,
            x: showWindow.music.x,
            y: showWindow.music.y,
          },
        });
        if (zIndex.curW !== "music") {
          setZIndex({
            ...zIndex,
            music: zIndex.cur,
            cur: zIndex.cur + 1,
            curW: "music",
          });
        }
        return;
      case "Todo":
        setShowWindow({
          ...showWindow,
          todo: {
            display: true,
            x: showWindow.todo.x,
            y: showWindow.todo.y,
          },
        });
        if (zIndex.curW !== "todo") {
          setZIndex({
            ...zIndex,
            todo: zIndex.cur,
            cur: zIndex.cur + 1,
            curW: "todo",
          });
        }
        return;
      default:
        return;
    }
  };
  return (
    <div
      className="header-drop-down-each"
      onClick={() => {
        witchWindowToShow(label);
      }}
    >
      <p>{label}</p>
    </div>
  );
};
export default HeaderDropItem;
