import Streams from '/imports/db/streams/Links';

if (Meteor.isServer) {
  Meteor.methods({
    getStreams: function() {
      let result = Streams.createQuery({
        $filters: { isActive: true },
        URL: 1,
        channel: {
          name: 1,
          logo: 1,
        },
      }).fetch();

      return result;
    },
  });
}
