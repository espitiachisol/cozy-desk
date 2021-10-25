import React from "react";
import HeaderDropItem from "./HeaderDropItem";
const HeaderDropMenu = function ({
  setShowWindow,
  showWindow,
  setZIndex,
  zIndex,
}) {
  return (
    <div className="header-drop-down-con">
      <HeaderDropItem
        setShowWindow={setShowWindow}
        showWindow={showWindow}
        setZIndex={setZIndex}
        zIndex={zIndex}
        label={"Sign"}
      />
      <HeaderDropItem
        setShowWindow={setShowWindow}
        showWindow={showWindow}
        setZIndex={setZIndex}
        zIndex={zIndex}
        label={"Tomato"}
      />
      <HeaderDropItem
        setShowWindow={setShowWindow}
        showWindow={showWindow}
        setZIndex={setZIndex}
        zIndex={zIndex}
        label={"Mixtape"}
      />
      <HeaderDropItem
        setShowWindow={setShowWindow}
        showWindow={showWindow}
        setZIndex={setZIndex}
        zIndex={zIndex}
        label={"Todo"}
      />
    </div>
  );
};
export default HeaderDropMenu;
