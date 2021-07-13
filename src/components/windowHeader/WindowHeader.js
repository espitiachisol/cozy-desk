import "./WindowHeader.css";
const WindowHeader = ({ mouseDown, setShowWindow, showWindow, label }) => {
  const witchLabelToDisplay = () => {
    let result;
    switch (label) {
      case "Desk":
        result = setShowWindow({
          ...showWindow,
          Desk: { display: false },
        });
        break;
      case "MIXTAPE":
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
      default:
      // code block
    }
    return result;
  };
  return (
    <div className="window-header" onMouseDown={mouseDown}>
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
