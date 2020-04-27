import scrapy
from pymongo import MongoClient

from streamerbot import settings
from streamerbot.loaders import StreamerBotItemLoader


class AoVivoClubSpider(scrapy.Spider):
    name = 'aovivoclub'

    def __init__(self, *args, **kwargs):
        super(AoVivoClubSpider, self).__init__(*args, **kwargs)
        self.client = MongoClient(settings.MONGODB_CONN_URI)
        self.db = self.client.get_database(settings.MONGODB_DB_NAME)
        self.source = self.db.sources.find_one({'alias': self.name})

        if not self.source:
            raise Exception(
                'Unable to find the source "{0}" in the database'.format(
                    self.name))

        self.start_urls = self.source['lookup']
        self.allowed_domains = list(self.source['domain'])
        self.client.close()

    def parse(self, response):
        itemLoader = StreamerBotItemLoader(response=response)

        for block in self.source['blocks']:
            urls = itemLoader.get_xpath(block['path'])

            for url in urls:
                itemLoader.replace_value('channel_url', url)
                itemLoader.replace_value('source_id', self.source['_id'])
                yield itemLoader.load_item()
