import { Meteor } from 'meteor/meteor';
import Streams from '/imports/db/streams/Links';
import Channels from '/imports/api/Channels';
import Sources from '/imports/api/Sources';
import assert from 'assert';

if (Meteor.isServer) {
  describe('Streams', () => {
    describe('retrieve data from the database', () => {
      let streamId;
      let channelId;
      let sourceId;
      let stream = {
        URL: 'http://example.com/path/to/stream.m3u8',
        quality: 'SD',
        priority: 2,
        sourceId: null,
        channelId: null,
        isActive: true,
        verifiedAt: Date.now(),
      };
      let channel = {
        name: 'MTV',
        alias: 'mtv',
        description: 'Music TeleVision',
        logo: 'https://example.com/logo.png',
        isActive: true,
      };
      let source = {
        name: 'AoVivo Club',
        alias: 'aovivoclub',
        domain: 'aovivo.club',
        lookup: [],
        blocks: [],
        isActive: true,
      };

      beforeEach(() => {
        channelId = Channels.insert(channel);
        sourceId = Sources.insert(source);
        stream.sourceId = sourceId;
        stream.channelId = channelId;
        streamId = Streams.insert(stream);
      });

      it('assert Streams object links', () => {
        let result = Streams.createQuery({
          $filters: { _id: streamId },
          channel: {
            name: 1,
          },
          source: {
            name: 1,
          },
        }).fetchOne();
        assert.deepEqual(result.channel._id, channelId);
        assert.deepEqual(result.source._id, sourceId);
        assert.equal(result.channel.name, 'MTV');
        assert.equal(result.source.name, 'AoVivo Club');
      });
    });
  });
}
