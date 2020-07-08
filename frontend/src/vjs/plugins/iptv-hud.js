import videojs from 'video.js';
import PropTypes from 'prop-types';
import Hud from '../components/hud';

const Plugin = videojs.getPlugin('plugin');

class IptvHudPlugin extends Plugin {
  constructor(player, options) {
    super(player, options);
    this.player.addChild(new Hud(player, options));
    this.player.muted(true); // Temporary
  }
}

IptvHudPlugin.propTypes = {
  player: PropTypes.object.isRequired,
  options: PropTypes.object,
};

Plugin.registerPlugin('IptvHudPlugin', IptvHudPlugin);

export default IptvHudPlugin;
