import React from "react";
const PlayList = ({
  songs,
  setSongIndex,
  currentPlaylistType,
  deletePlayList,
  setSongs,
  userState,
}) => {
  return (
    <>
      {songs.length > 0 ? (
        songs.map((list, index) => {
          return (
            <div key={list.id} className="music-list-con">
              {currentPlaylistType === "user" ? (
                <div
                  className="delete-playList delete"
                  onClick={() => {
                    deletePlayList(list.id);
                  }}
                >
                  X
                </div>
              ) : null}
              <div
                className="music-list"
                onClick={() => {
                  setSongs(songs);
                  setSongIndex(index);
                }}
              >
                <img src={list.icon} alt={list.title} />
                <p>
                  {list.title.length > 20
                    ? list.title.slice(0, 20).padEnd(23, ".") +
                      list.title.slice(list.title.length - 3, list.title.length)
                    : list.title}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="music-list-no-songs-message">
          {userState ? (
            <div className="user-no-songs-message">
              <p>You can add songs with the button below!</p>
              <p>Note, the total number of songs is limited to ten.</p>
            </div>
          ) : (
            <div className="guest-no-songs-message">
              <p>Create an account for add your own playlist</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default PlayList;
