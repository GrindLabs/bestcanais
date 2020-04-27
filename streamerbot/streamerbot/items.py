# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class StreamerBotItem(scrapy.Item):
    channel_url = scrapy.Field()
    stream_url = scrapy.Field()
    quality = scrapy.Field()
    priority = scrapy.Field()
    is_active = scrapy.Field()
    channel_id = scrapy.Field()
    source_id = scrapy.Field()
