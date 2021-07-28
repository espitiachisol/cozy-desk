import "./WindowHeader.css";
const WindowHeader = ({ mouseDown, setShowWindow, showWindow, label }) => {
  const witchLabelToDisplay = () => {
    let result;
    switch (label) {
      case "Todo":
        result = setShowWindow({
          ...showWindow,
          Todo: { display: false },
        });
        break;
      case "Music":
        result = setShowWindow({
          ...showWindow,
          Music: { display: false },
        });
        break;
      case "Tomato":
        result = setShowWindow({
          ...showWindow,
          Tomato: { display: false },
        });
        break;
      case "CozyDesk":
        result = setShowWindow({
          ...showWindow,
          SignWindow: { display: false },
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
    >
      <p
        className="close-window pointer"
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
