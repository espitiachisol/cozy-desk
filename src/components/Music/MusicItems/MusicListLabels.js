import React from 'react';

const MusicListLabels = function ({ currentPlaylistType, setCurrentPlaylistType }) {
  return (
    <div className="toggle-playList-con">
      <button
        className={`${currentPlaylistType === 'default' ? 'active' : ''}`}
        onClick={() => {
          setCurrentPlaylistType('default');
        }}
      >
        Mixtape
      </button>
      <button
        className={`${currentPlaylistType === 'user' ? 'active' : ''}`}
        onClick={() => {
          setCurrentPlaylistType('user');
        }}
      >
        My Playlist
      </button>
    </div>
  );
};
export default MusicListLabels;
