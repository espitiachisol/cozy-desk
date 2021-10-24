import React from "react";
import "./WindowHeader.css";
const WindowHeader = ({
  mouseDown,
  setShowWindow,
  showWindow,
  label,
  position,
}) => {
  const witchLabelToDisplay = () => {
    let result;
    switch (label) {
      case "Todo":
        result = setShowWindow({
          ...showWindow,
          Todo: { display: false, x: position.x, y: position.y },
        });
        break;
      case "Mixtape":
        result = setShowWindow({
          ...showWindow,
          Music: { display: false, x: position.x, y: position.y },
        });
        break;
      case "Tomato":
        result = setShowWindow({
          ...showWindow,
          Tomato: { display: false, x: position.x, y: position.y },
        });
        break;
      case "CozyDesk":
        result = setShowWindow({
          ...showWindow,
          SignWindow: { display: false, x: position.x, y: position.y },
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
      case "Todo":
        result = setShowWindow({
          ...showWindow,
          Todo: { display: true, x: position.x, y: position.y },
        });
        break;
      case "Mixtape":
        result = setShowWindow({
          ...showWindow,
          Music: { display: true, x: position.x, y: position.y },
        });
        break;
      case "Tomato":
        result = setShowWindow({
          ...showWindow,
          Tomato: { display: true, x: position.x, y: position.y },
        });
        break;
      case "CozyDesk":
        result = setShowWindow({
          ...showWindow,
          SignWindow: { display: true, x: position.x, y: position.y },
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
