import React from 'react';
import VideoPlayer from '../components/video-player';
import PlayerHUD from '../layouts/player-hud';

export default () => {
  const videoPlayerOptions = {
    autoplay: true,
    controls: true,
    sources: [
      {
        src: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
        type: 'application/x-mpegURL',
      },
    ],
  };
  return (
    <PlayerHUD>
      <VideoPlayer {...videoPlayerOptions} />
    </PlayerHUD>
  );
};
