import videojs from 'video.js';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';

const Button = videojs.getComponent('Button');
const Component = videojs.getComponent('Component');
const Dom = videojs.dom;
const ModalDialog = videojs.getComponent('ModalDialog');

class BaseButton extends Button {
  createEl() {
    const button = Dom.createEl(
      'a',
      {},
      {
        class: this.buildCSSClass(),
        role: 'button',
        href: '#',
      }
    );

    return button;
  }

  buildCSSClass() {
    return 'nav-link text-light text-uppercase font-weight-bold vjs-hud-action-button';
  }
}

class BtnMenu extends BaseButton {
  constructor(player, options) {
    super(player, options);
  }

  handleClick(event) {
    event.preventDefault();
  }

  createEl() {
    const button = super.createEl();

    button.innerHTML = `<svg class="bi bi-list" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg> Menu`;

    return button;
  }
}

class BtnFullScreen extends BaseButton {
  handleClick(event) {
    event.preventDefault();

    if (!this.player_.isFullscreen()) {
      this.player_.requestFullscreen();
    } else {
      this.player_.exitFullscreen();
    }
  }

  createEl() {
    const button = super.createEl();

    button.innerHTML = `<svg class="bi bi-fullscreen" width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/></svg> Tela Cheia`;

    return button;
  }
}

class HudActionBar extends Component {
  createEl() {
    const ul = Dom.createEl('ul', {
      className: 'nav nav-pills vjs-hud-action-items',
    });

    [
      new BtnFullScreen(this.player_, this.options_),
      new BtnMenu(this.player_, this.options_),
    ].forEach(function (component) {
      const li = Dom.createEl('li', {
        className: 'nav-item vjs-hud-action-item',
      });

      li.appendChild(component.el());
      ul.appendChild(li);
    }, this);

    const div = Dom.createEl('div', { className: 'row vjs-hud-action-bar' });

    div.appendChild(ul);

    return div;
  }
}

HudActionBar.propTypes = {
  player: PropTypes.object.isRequired,
  options: PropTypes.object,
};

Component.registerComponent('HudActionBar', HudActionBar);

export default HudActionBar;
