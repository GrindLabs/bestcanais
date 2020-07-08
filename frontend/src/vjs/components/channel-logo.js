import videojs from 'video.js';
import PropTypes from 'prop-types';
import './channel-logo.css';

const Component = videojs.getComponent('Component');
const Dom = videojs.dom;

class ChannelLogo extends Component {
  createEl() {
    const logo = Dom.createEl(
      'img',
      { className: 'img-fluid' },
      {
        src: 'https://aovivo.gratis/wp-content/uploads/2019/07/combate.png',
        alt: 'Record',
      }
    );
    const col = Dom.createEl('div', {
      className: 'col-2 text-center vjs-channel-logo',
    });

    col.appendChild(logo);

    return col;
  }
}

ChannelLogo.propTypes = {
  player: PropTypes.object.isRequired,
  options: PropTypes.object,
};

Component.registerComponent('ChannelLogo', ChannelLogo);

export default ChannelLogo;
