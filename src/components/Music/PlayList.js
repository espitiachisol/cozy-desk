import React from 'react';
import NoDataMessage from '../shared/NoDataMessage/NoDataMessage';

const PlayList = ({
  songs,
  setSongIndex,
  currentPlaylistType,
  deletePlayList,
  setSongs,
  userState,
}) => (
  <>
    {songs.length > 0 ? (
      songs.map((list, index) => (
        <div key={list.id} className="music-list-con">
          {currentPlaylistType === 'user' ? (
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
                ? list.title.slice(0, 20).padEnd(23, '.')
                  + list.title.slice(list.title.length - 3, list.title.length)
                : list.title}
            </p>
          </div>
        </div>
      ))
    ) : (
      <NoDataMessage
        userState={userState}
        userMessage={{
          title: 'You can add songs with the button below! ',
          content:
            'Note, the total number of songs is limited to 10. Each song size is limited to 10MB ☟',
        }}
        guestMessage={{
          title: '',
          content: 'Create an account for add your own playlist',
        }}
      />
    )}
  </>
);
export default PlayList;
