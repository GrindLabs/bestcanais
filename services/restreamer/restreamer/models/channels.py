import datetime

import mongoengine


class Channels(mongoengine.Document):
    name = mongoengine.StringField(required=True)
    alias = mongoengine.StringField(required=True)
    description = mongoengine.StringField(default=None)
    logo = mongoengine.URLField(required=True)
    is_active = mongoengine.BooleanField(required=True, db_field='isActive')
    priority = mongoengine.IntField(db_field='priority', required=True)
    verified_at = mongoengine.DateTimeField(
        default=datetime.datetime.utcnow, db_field='verifiedAt')
