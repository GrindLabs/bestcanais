import React from 'react';
import { Meteor } from 'meteor/meteor';
import Streams from '/imports/api/Streams';
import Channels from '/imports/api/Channels';
import './VideoJSPlayer.css';

const Clappr = require('clappr');
const ChromecastPlugin = require('clappr-chromecast-plugin');

/**
 * TODO: Things that must be done to fix the duplicated players after stop the ChromeCast plugin
 * - Modularize the ErrorPlugin to a single file and rename it to CustomErrorPlugin
 * - Init the player options and core in the constructor
 * - Refactor the change method not to destroy the player but to re-configure it
 * - If the ChromeCast is playing and the user changes the channel, it must be updated
 */
export default class VideoJSPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.lastStreams = [];
    this.player = null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    let hasChanged = nextProps.srcChannel !== this.props.srcChannel;

    this.props = nextProps;
    this.state = nextState;

    if (hasChanged) {
      this.change(nextProps.srcChannel);
    }

    return false;
  }

  componentDidMount() {
    this.change(this.props.srcChannel);
  }

  change(srcChannel) {
    if (this.player) {
      this.destroyPlayer();
    }

    console.log(window.chrome.cast);

    /*
      Catch any network error and try to reconnect to the source according to the retries variable value,
      if it exceed the number of retries the system should take the next available stream else it should
      show the custom error screen.
    */
    var self = this;
    var retries = Meteor.settings.public.player.retries;
    var ErrorPlugin = Clappr.ContainerPlugin.extend({
      name: 'error_plugin',
      bindEvents: function() {
        this.listenTo(
          this.container,
          Clappr.Events.CONTAINER_ERROR,
          this.onError
        );
      },
      hide: function() {
        this._err && this._err.remove();
      },
      show: function() {
        var $ = Clappr.$;
        this.hide();
        var txt =
          this.options.errorPlugin && this.options.errorPlugin.text
            ? this.options.errorPlugin.text
            : 'Um erro fatal ocorreu.';
        this._err = $('<div>')
          .css({
            position: 'absolute',
            'z-index': '999',
            width: '100%',
            height: '100%',
            'background-color': 'black',
            'padding-top': '20%',
            'text-align': 'center',
            'font-weight': 'bold',
            'text-shadow': '1px 1px #fff',
          })
          .append(
            $('<h2>')
              .text(txt)
              .css({
                'font-size': '200%',
              })
          )
          .append(
            $('<p>')
              .html('Recarregue a página ou tente outro canal.')
              .css({
                'font-size': '120%',
                margin: '15px',
              })
          );
        this.container && this.container.$el.prepend(this._err);
      },
      onError: function(err) {
        if (!this.container) {
          return;
        }

        this.container.getPlugin('click_to_pause').disable();

        if (err.raw.type === 'networkError') {
          if (retries > 0) {
            setTimeout(function() {
              player.configure(playerOptions);
              retries--;
            }, Meteor.settings.public.player.retriesDelay);

            return;
          }

          self.lastStreams.push(srcChannel);
          let errStream = Streams.findOne({ URL: srcChannel });
          let newStream = Streams.findOne(
            {
              URL: { $nin: self.lastStreams },
              channelId: errStream.channelId,
              isActive: true,
            },
            {
              sort: {
                priority: 1,
              },
            }
          );

          if (newStream === undefined) {
            this.show();
            return;
          }

          self.change(newStream.URL);
        }
      },
    });
    var playerOptions = {
      disableErrorScreen: true,
      gaAccount: Meteor.settings.public.google.analytics,
      gaTrackerName: Meteor.settings.public.player.trackerName,
      parentId: '#player',
      plugins: [ChromecastPlugin, ErrorPlugin],
      playbackNotSupportedMessage:
        'Aguarde o carregamento do canal, caso contrário tente um navegador diferente...',
      mediacontrol: { seekbar: '#424242' },
      height: '0',
      width: '100%',
      playback: {
        hlsjsConfig: {
          initialLiveManifestSize: 5,
          maxBufferLength: 5,
          maxBufferSize: 100 * 1000 * 1000,
          liveSyncDurationCount: 5,
        },
      },
      errorPlugin: {
        text: 'Canal indisponível no momento...',
      },
      chromecast: {},
    };
    var player = new Clappr.Player(playerOptions);

    if (srcChannel !== undefined) {
      let source = Meteor.settings.public.player.bypassURL.concat(
        srcChannel.replace(/^https?:\/\//, '')
      );
      let stream = Streams.findOne({ URL: srcChannel });
      let channel = Channels.findOne({ _id: stream.channelId });

      playerOptions.chromecast = {
        media: {
          title: channel.name,
          subtitle: 'Programação Indisponível',
        },
        poster: channel.logo,
      };
      playerOptions.source = source;
      playerOptions.autoPlay = true;
      player.configure(playerOptions);
    }

    this.player = player;
  }

  componentWillUnmount() {
    this.destroyPlayer();
  }

  destroyPlayer() {
    if (this.player) {
      this.player.destroy();
    }

    this.player = null;
  }

  render() {
    return <div id="player" />;
  }
}
