import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Ads = new Mongo.Collection('ads', { idGeneration: 'MONGO' });
const Schemas = {};

Schemas.Ads = new SimpleSchema({
  provider: {
    type: String,
    label: 'Provider',
  },
  domain: {
    type: String,
    label: 'Domain',
  },
  elementId: {
    type: String,
    label: 'Element DOM ID',
  },
  rawHtml: {
    type: String,
    label: 'Raw HTML',
  },
  createdAt: {
    type: Date,
    label: 'Created At',
    defaultValue: new Date(),
    optional: true,
  },
});

Ads.attachSchema(Schemas.Ads);

Ads.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export default Ads;
