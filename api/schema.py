import graphene
from graphene.relay import Node
from graphene_mongo import MongoengineConnectionField, MongoengineObjectType

from models import Channels as ChannelsModel
from models import Sources as SourcesModel


class Sources(MongoengineObjectType):
    class Meta:
        model = SourcesModel
        interfaces = (Node,)


class Channels(MongoengineObjectType):
    class Meta:
        model = ChannelsModel
        interfaces = (Node,)


class Query(graphene.ObjectType):
    node = Node.Field()
    all_sources = MongoengineConnectionField(Sources)
    all_channels = MongoengineConnectionField(Channels)


schema = graphene.Schema(query=Query, types=[Sources, Channels])
