import datetime

import mongoengine

from restreamer.models.channels import Channels
from restreamer.models.sources import Sources


class Streams(mongoengine.Document):
    url = mongoengine.URLField(db_field='URL', required=True)
    quality = mongoengine.StringField(
        required=True, choices=('SD', 'HD', 'FHD'))
    priority = mongoengine.fields.IntField(required=True)
    source = mongoengine.ReferenceField(
        Sources, db_field='sourceId', required=True,
        reverse_delete_rule=mongoengine.CASCADE)
    channel = mongoengine.ReferenceField(
        Channels, db_field='channelId', required=True,
        reverse_delete_rule=mongoengine.CASCADE)
    is_active = mongoengine.BooleanField(db_field='isActive', required=True)
    verified_at = mongoengine.DateTimeField(
        default=datetime.datetime.utcnow, db_field='verifiedAt')
