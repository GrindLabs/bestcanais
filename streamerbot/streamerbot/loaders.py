# -*- coding: utf-8 -*-

# Define here the loaders for your items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/loaders.html


from scrapy.loader import ItemLoader
from scrapy.loader.processors import MapCompose, TakeFirst
from slugify import slugify

from streamerbot.items import StreamerBotItem
from streamerbot.processors import extract_quality, extract_name


class StreamerBotItemLoader(ItemLoader):
    default_item_class = StreamerBotItem
    default_output_processor = TakeFirst()
    slug_in = MapCompose(slugify)
    quality_in = MapCompose(extract_quality)


class TopCanaisItemLoader(StreamerBotItemLoader):
    name_in = MapCompose(lambda v: extract_name(
        v, r'assistir\s(.+)\sao\svivo'))
    slug_in = MapCompose(lambda v: extract_name(
        v, r'assistir\s(.+)\sao\svivo'), slugify)
