import React from 'react';
import './WindowHeader.css';

const WindowHeader = ({
  mouseDown, setShowWindow, showWindow, label, position,
}) => {
  const witchLabelToDisplay = () => {
    let result;
    switch (label) {
      case 'Todo':
        result = setShowWindow({
          ...showWindow,
          todo: { display: false, x: position.x, y: position.y },
        });
        break;
      case 'Mixtape':
        result = setShowWindow({
          ...showWindow,
          music: { display: false, x: position.x, y: position.y },
        });
        break;
      case 'Tomato':
        result = setShowWindow({
          ...showWindow,
          tomato: { display: false, x: position.x, y: position.y },
        });
        break;
      case 'CozyDesk':
        result = setShowWindow({
          ...showWindow,
          signWindow: { display: false, x: position.x, y: position.y },
        });
        break;
      default:
      // code block
    }
    return result;
  };
  const saveCurPosition = () => {
    let result;
    switch (label) {
      case 'Todo':
        result = setShowWindow({
          ...showWindow,
          todo: { display: true, x: position.x, y: position.y },
        });
        break;
      case 'Mixtape':
        result = setShowWindow({
          ...showWindow,
          music: { display: true, x: position.x, y: position.y },
        });
        break;
      case 'Tomato':
        result = setShowWindow({
          ...showWindow,
          tomato: { display: true, x: position.x, y: position.y },
        });
        break;
      case 'CozyDesk':
        result = setShowWindow({
          ...showWindow,
          signWindow: { display: true, x: position.x, y: position.y },
        });
        break;
      default:
      // code block
    }
    return result;
  };
  return (
    <div
      className="window-header"
      onMouseDown={(e) => {
        mouseDown(e);
      }}
      onMouseUp={() => {
        saveCurPosition();
      }}
    >
      <p
        className="close-window  delete"
        onClick={() => {
          witchLabelToDisplay();
        }}
      >
        X
      </p>
      <div className="window-header-text">{label}</div>
    </div>
  );
};
export default WindowHeader;
