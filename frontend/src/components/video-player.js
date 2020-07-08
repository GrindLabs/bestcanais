import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '../vjs/plugins/iptv-hud';

const styles = {
  root: {
    '& > div': {
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
    },
  },
};

class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props);
    this.player.IptvHudPlugin();
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div id="player" className={classes.root}>
        <div data-vjs-player>
          <video ref={node => (this.videoNode = node)} className="video-js" />
        </div>
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VideoPlayer);
