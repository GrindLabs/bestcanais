import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Sources = new Mongo.Collection('sources', { idGeneration: 'MONGO' });
const Schemas = {};

Schemas.SourceBlock = new SimpleSchema({
  name: {
    type: String,
    label: 'Block Name',
  },
  path: {
    type: String,
    label: 'Element Path',
  },
  regex: {
    type: String,
    label: 'Regex Extractor',
    optional: true,
    defaultValue: null,
  },
});

Schemas.Sources = new SimpleSchema({
  name: {
    type: String,
    label: 'Provider',
  },
  alias: {
    type: String,
    label: 'Alias',
  },
  domain: {
    type: String,
    label: 'Domain',
    optional: true,
  },
  lookup: {
    type: Array,
    label: 'Lookup URLs',
  },
  'lookup.$': {
    type: String,
  },
  blocks: {
    type: Array,
    label: 'Blocks',
  },
  'blocks.$': {
    type: Schemas.SourceBlock,
  },
  isActive: {
    type: Boolean,
    label: 'Is Active?',
  },
});

Sources.attachSchema(Schemas.Sources);

Sources.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export default Sources;
