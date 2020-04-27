import Streams from '/imports/api/Streams';
import Channels from '/imports/api/Channels';
import Sources from '/imports/api/Sources';
import Ads from '/imports/api/Ads';

if (Meteor.isServer) {
  Meteor.publish('streams', function streamsPublication() {
    return Streams.find();
  });

  Meteor.publish('channels', function channelPublication() {
    return Channels.find();
  });

  Meteor.publish('sources', function sourcesPublication() {
    return Sources.find();
  });
}

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('ads', function adsPublication() {
    return Ads.find();
  });
}
