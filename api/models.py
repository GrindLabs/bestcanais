import mongoengine


class SourceBlock(mongoengine.EmbeddedDocument):
    name = mongoengine.StringField()
    path = mongoengine.StringField()


class SourceField(mongoengine.EmbeddedDocument):
    key = mongoengine.StringField()
    path = mongoengine.StringField()


class Sources(mongoengine.Document):
    meta = {'collection': 'sources'}
    name = mongoengine.StringField()
    slug = mongoengine.StringField()
    domain = mongoengine.StringField()
    lookup = mongoengine.ListField(mongoengine.StringField())
    blocks = mongoengine.EmbeddedDocumentListField(SourceBlock)
    fields = mongoengine.EmbeddedDocumentListField(SourceField)
    is_active = mongoengine.BooleanField(db_field='isActive')


class Channels(mongoengine.Document):
    meta = {'collection': 'channels'}
    name = mongoengine.StringField()
    slug = mongoengine.StringField()
    url = mongoengine.URLField()
    stream_url = mongoengine.URLField(db_field='streamUrl', null=True)
    quality = mongoengine.IntField()
    is_active = mongoengine.BooleanField(db_field='isActive')
    source = mongoengine.ReferenceField('Sources', db_field='sourceId')
    verified_at = mongoengine.DateTimeField(db_field='verifiedAt')
