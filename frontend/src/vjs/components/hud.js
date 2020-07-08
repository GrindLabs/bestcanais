import videojs from 'video.js';
import PropTypes from 'prop-types';
import ChannelLogo from './channel-logo';
import ChannelInfo from './channel-info';
import './hud.css';

const Component = videojs.getComponent('Component');
const Dom = videojs.dom;

class Hud extends Component {
  constructor(player, options) {
    super(player, options);

    if (this.player_.getChild('ControlBar')) {
      this.player_.removeChild('ControlBar');
    }
  }

  createEl() {
    const hud = Dom.createEl('div', { className: 'vjs-hud' });
    const container = Dom.createEl('div', { className: 'container-lg' });
    const row = Dom.createEl('div', { className: 'row' });

    [
      new ChannelLogo(this.player_, this.options_),
      new ChannelInfo(this.player_, this.options_),
    ].forEach(component => {
      row.appendChild(component.el());
    });

    container.appendChild(row);
    hud.appendChild(container);

    return hud;
  }
}

Hud.propTypes = {
  player: PropTypes.object.isRequired,
  options: PropTypes.object,
};

Component.registerComponent('Hud', Hud);

export default Hud;
