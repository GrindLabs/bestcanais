import videojs from 'video.js';
import PropTypes from 'prop-types';
import HudActionBar from './hud-action-bar';
import './channel-info.css';

const Component = videojs.getComponent('Component');
const Dom = videojs.dom;

class ChannelInfo extends Component {
  createEl() {
    const col = Dom.createEl('div', { className: 'col vjs-channel-info' });
    const channelTitle = Dom.createEl('div', { className: 'row' });
    const channelInfo = Dom.createEl('div', { className: 'row' });

    channelTitle.innerHTML = `
      <div class="col-12">
        <h6 id="channel-info">
          <span id="channel-name">Record</span>
          <span id="current-time" class="float-right">18:19</span>
        </h3>
      </div>
    `;
    channelInfo.innerHTML = `
      <div class="col-12">
        <h5 id="channel-show-info">
          <span id="time-progress"></span>
          <span id="channel-show-name">Jornal da Record</span>
          <span id="channel-show-duration" class="float-right">18:00 - 18:30</span>
        </h3>
      </div>
    `;

    col.appendChild(channelTitle);
    col.appendChild(channelInfo);

    const hudActionBar = new HudActionBar(this.player_, this.options_);

    col.appendChild(hudActionBar.el());

    return col;
  }
}

ChannelInfo.propTypes = {
  player: PropTypes.object.isRequired,
  options: PropTypes.object,
};

Component.registerComponent('ChannelInfo', ChannelInfo);

export default ChannelInfo;
