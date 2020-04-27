import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Channels = new Mongo.Collection('channels', { idGeneration: 'MONGO' });
const Schemas = {};



Schemas.Channels = new SimpleSchema({
  name: {
    type: String,
    label: 'Channel Name',
  },
  alias: {
    type: String,
    label: 'Sanitized Name',
  },
  description: {
    type: String,
    label: 'Channel Description',
    optional: true,
    defaultValue: null,
  },
  logo: {
    type: String,
    label: 'Logo',
    regEx: SimpleSchema.RegEx.Url,
  },
  isActive: {
    type: Boolean,
    label: 'Is Active?',
    optional: true,
    defaultValue: true,
  },
  priority: {
    type: Number,
    label: 'Priority',
    defaultValue: 1,
  },
});

Channels.attachSchema(Schemas.Channels);

Channels.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export default Channels;
