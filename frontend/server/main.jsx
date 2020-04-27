import { Meteor } from 'meteor/meteor';
import '/server/migrations';
import '/server/publications';

Meteor.startup(() => {
  Migrations.migrateTo('latest');
});
