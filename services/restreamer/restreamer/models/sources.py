import mongoengine


class SourceBlock(mongoengine.EmbeddedDocument):
    name = mongoengine.StringField(required=True)
    path = mongoengine.StringField(required=True)
    regex = mongoengine.StringField(required=True)


class Sources(mongoengine.Document):
    name = mongoengine.StringField(required=True)
    alias = mongoengine.StringField(required=True)
    domain = mongoengine.StringField(required=True)
    lookup = mongoengine.fields.ListField(
        mongoengine.StringField(), required=True)
    blocks = mongoengine.fields.EmbeddedDocumentListField(
        SourceBlock, required=True)
    is_active = mongoengine.BooleanField(required=True, db_field='isActive')
