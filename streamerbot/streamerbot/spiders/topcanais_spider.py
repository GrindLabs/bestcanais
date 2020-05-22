import scrapy
from pymongo import MongoClient
from scrapy.exceptions import CloseSpider

from streamerbot import settings
from streamerbot.loaders import TopCanaisItemLoader


class TopCanaisSpider(scrapy.Spider):
    name = 'topcanais'

    def __init__(self, *args, **kwargs):
        super(TopCanaisSpider, self).__init__(*args, **kwargs)
        self.client = MongoClient(settings.MONGODB_CONN_URI)
        self.db = self.client.get_database(settings.MONGODB_DB_NAME)
        self.source = self.db.sources.find_one(
            {'slug': self.name, 'isActive': True})

        if not self.source:
            raise CloseSpider(
                'Unable to find the source "{0}" in the database'.format(
                    self.name))

        self.start_urls = self.source.get('lookup')
        self.allowed_domains = list(self.source.get('domain'))
        self.client.close()

    def parse(self, response):
        for block in self.source.get('blocks'):
            for channel in response.xpath(block.get('path')):
                loader = TopCanaisItemLoader(selector=channel)
                loader.add_value('source_id', self.source.get('_id'))
                loader.add_value('rpc_method', 'extractTopCanaisStream')

                for field in self.source.get('fields'):
                    loader.add_xpath(field.get('key'), field.get('path'))

                yield loader.load_item()
