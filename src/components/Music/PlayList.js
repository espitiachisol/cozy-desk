import React from "react";
const PlayList = ({
  songs,
  setSongIndex,
  currentPlaylistType,
  deletePlayList,
}) => {
  return (
    <>
      {songs.map((list, index) => {
        return (
          <div
            key={list.id}
            className="music-list"
            onClick={() => {
              setSongIndex(index);
            }}
          >
            {currentPlaylistType === "user" ? (
              <div
                className="delete-playList"
                onClick={() => {
                  deletePlayList();
                }}
              >
                X
              </div>
            ) : null}
            <img src={list.icon} alt={list.title} />
            <p>
              {list.title.length > 30
                ? list.title.slice(0, 30).padEnd(33, ".")
                : list.title}
            </p>
          </div>
        );
      })}
    </>
  );
};
export default PlayList;
