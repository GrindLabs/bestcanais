import Streams from '/imports/api/Streams';
import Channels from '/imports/api/Channels';
import Sources from '/imports/api/Sources';

Streams.addLinks({
  channel: {
    type: 'one',
    collection: Channels,
    field: 'channelId',
  },
  source: {
    type: 'one',
    collection: Sources,
    field: 'sourceId',
  },
});

export default Streams;
