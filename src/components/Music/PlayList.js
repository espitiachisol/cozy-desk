import React from "react";
const PlayList = ({
  songs,
  setSongIndex,
  currentPlaylistType,
  deletePlayList,
  setSongs,
}) => {
  return (
    <>
      {songs.map((list, index) => {
        return (
          <div
            key={list.id}
            className="music-list"
            // onDoubleClick={() => {
            //   setSongs(songs);
            //   setSongIndex(index);
            // }}
            onClick={() => {
              setSongs(songs);
              setSongIndex(index);
            }}
          >
            {currentPlaylistType === "user" ? (
              <div
                className="delete-playList"
                onClick={() => {
                  deletePlayList(list.id);
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
