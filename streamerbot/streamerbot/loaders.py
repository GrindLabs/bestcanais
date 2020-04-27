# -*- coding: utf-8 -*-

# Define here the loaders for your items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/loaders.html

from scrapy.loader import ItemLoader
from scrapy.loader.processors import TakeFirst

from streamerbot.items import StreamerBotItem


class StreamerBotItemLoader(ItemLoader):
    default_item_class = StreamerBotItem
    default_output_processor = TakeFirst()
