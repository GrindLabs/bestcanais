# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class StreamerBotItem(scrapy.Item):
    name = scrapy.Field()
    slug = scrapy.Field()
    logo = scrapy.Field()
    quality = scrapy.Field()
    url = scrapy.Field()
    stream_url = scrapy.Field()
    is_active = scrapy.Field()
    source_id = scrapy.Field()
    verified_at = scrapy.Field()
    rpc_method = scrapy.Field()
