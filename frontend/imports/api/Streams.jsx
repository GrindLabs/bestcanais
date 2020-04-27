import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Streams = new Mongo.Collection('streams', { idGeneration: 'MONGO' });
const Schemas = {};

Schemas.Streams = new SimpleSchema({
  URL: {
    type: String,
    label: 'Stream URL',
    regEx: SimpleSchema.RegEx.Url,
  },
  quality: {
    type: String,
    label: 'Stream Quality',
    allowedValues: ['SD', 'HD', 'FHD'],
  },
  priority: {
    type: SimpleSchema.Integer,
    label: 'Stream Priority',
  },
  sourceId: {
    type: Mongo.ObjectID,
    label: 'Source ID',
    blackbox: true,
  },
  channelId: {
    type: Mongo.ObjectID,
    label: 'Channel ID',
    blackbox: true,
  },
  isActive: {
    type: Boolean,
    label: 'Is Active?',
  },
  verifiedAt: {
    type: Date,
    label: 'Verified At',
  },
});

Streams.attachSchema(Schemas.Streams);

Streams.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export default Streams;
