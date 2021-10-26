import React from 'react';

const EachIcon = function ({
  setShowWindow, showWindow, setZIndex, zIndex, label, iconImg,
}) {
  const witchWindowToShow = () => {
    switch (label) {
      case 'Tomato':
        setShowWindow({
          ...showWindow,
          tomato: {
            display: true,
            x: showWindow.tomato.x,
            y: showWindow.tomato.y,
          },
        });
        if (zIndex.curW !== 'tomato') {
          setZIndex({
            ...zIndex,
            tomato: zIndex.cur,
            cur: zIndex.cur + 1,
            curW: 'tomato',
          });
        }
        return;
      case 'Mixtape':
        setShowWindow({
          ...showWindow,
          music: {
            display: true,
            x: showWindow.music.x,
            y: showWindow.music.y,
          },
        });
        if (zIndex.curW !== 'music') {
          setZIndex({
            ...zIndex,
            music: zIndex.cur,
            cur: zIndex.cur + 1,
            curW: 'music',
          });
        }
        return;
      case 'Todo':
        setShowWindow({
          ...showWindow,
          todo: {
            display: true,
            x: showWindow.todo.x,
            y: showWindow.todo.y,
          },
        });
        if (zIndex.curW !== 'todo') {
          setZIndex({
            ...zIndex,
            todo: zIndex.cur,
            cur: zIndex.cur + 1,
            curW: 'todo',
          });
        }
        break;
      default:
    }
  };
  return (
    <div className="each-icon" onClick={witchWindowToShow}>
      <img className="desk-icon" src={iconImg} alt={label} />
      <p>{label}</p>
    </div>
  );
};
export default EachIcon;
