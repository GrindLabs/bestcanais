import React, { useContext } from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import VideoJSPlayer from './videoJSPlayer/VideoJSPlayer.jsx';
import { ChannelContext } from '/imports/ui/layouts/Layout';

const useStyles = makeStyles(theme => ({
  root: {
    height: '600px',
    border: 0,
  },
}));

const VideoPlayer = () => {
  const channel = useContext(ChannelContext);

  return (
    <>
      <Card>
        <VideoJSPlayer srcChannel={channel} />
      </Card>
    </>
  );
};

export default VideoPlayer;
