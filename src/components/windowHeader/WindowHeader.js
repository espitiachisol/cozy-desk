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
      case "Music":
        result = setShowWindow({
          ...showWindow,
          Music: { display: false },
        });
        break;
      default:
      // code block
    }
    return result;
  };
  return (
    <div className="window-header" onMouseDown={mouseDown}>
      <i
        className="close-window pointer"
        onClick={() => {
          witchLabelToDisplay();
        }}
      >
        &times;
      </i>
      <div className="window-header-text">{label}</div>
    </div>
  );
};
export default WindowHeader;
