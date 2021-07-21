import "./WindowHeader.css";
const WindowHeader = ({
  mouseDown,
  setShowWindow,
  showWindow,
  label,
  // setZIndex,
  // zIndex,
}) => {
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

  // const witchZindex = () => {
  //   switch (zIndex.curW) {
  //     case "Todo":
  //       if (zIndex.curW !== "Todo") {
  //         setZIndex({
  //           ...zIndex,
  //           Todo: zIndex.cur,
  //           cur: zIndex.cur + 1,
  //           curW: "Todo",
  //         });
  //       }
  //       break;
  //     case "Music":
  //       console.log(zIndex.curW);
  //       if (zIndex.curW !== "Music") {
  //         setZIndex({
  //           ...zIndex,
  //           Music: zIndex.cur,
  //           cur: zIndex.cur + 1,
  //           curW: "Music",
  //         });
  //       }

  //       break;
  //     case "Tomato":
  //       if (zIndex.curW !== "Tomato") {
  //         setZIndex({
  //           ...zIndex,
  //           Tomato: zIndex.cur,
  //           cur: zIndex.cur + 1,
  //           curW: "Tomato",
  //         });
  //       }
  //       break;
  //     default:
  //   }
  // };
  return (
    <div
      className="window-header"
      onMouseDown={(e) => {
        // witchZindex();
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
