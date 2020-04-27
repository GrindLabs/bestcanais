# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

import asyncio
import datetime
import re
import time
import urllib.request
from asyncio.exceptions import IncompleteReadError, InvalidStateError
from asyncio.exceptions import TimeoutError as TimeoutErrorAsyncio
from urllib.error import URLError

from pymongo import MongoClient
from pyppeteer import launch
from pyppeteer.errors import BrowserError, PageError, TimeoutError

from streamerbot import settings
from streamerbot.settings import logger


class MongoBasePipeline(object):
    collection_name = 'streams'

    def __init__(self, mongo_uri, mongo_db):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db

    @classmethod
    def from_crawler(cls, crawler):
        return cls(
            mongo_uri=crawler.settings.get('MONGODB_CONN_URI'),
            mongo_db=crawler.settings.get('MONGODB_DB_NAME')
        )

    def open_spider(self, spider):
        self.client = MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        return item


class ChannelVerificationPipeline(MongoBasePipeline):
    collection_name = 'channels'

    def process_item(self, item, spider):
        channel_url = item.get('channel_url')
        logger.debug('Verifying channel URL from {0}'.format(channel_url))
        channels = self.db[self.collection_name].find({'isActive': True})
        block = spider.source['blocks'][0]

        for channel in channels:
            regex_name = re.sub(r'\s+', '.*', channel['name'])
            found = re.match(
                r'{0}'.format(block['regex'].format(regex_name)),
                channel_url,
                flags=re.IGNORECASE
            )

            if found:
                logger.debug('Regex result: {0}'.format(found.groups()))
                quality = found.group(2).upper() if found.group(2) else 'SD'
                logger.info(
                    'Found channel {0} with quality {1}'.format(
                        channel['name'], quality))
                item['quality'] = quality
                item['priority'] = settings.STREAM_PRIORITY[quality]
                item['channel_id'] = channel['_id']
                return item

        logger.warning('No channels found for URL {0}'.format(channel_url))


class ExtractM3U8Pipeline(object):
    async def parse_stream(self, item):
        channel_url = item.get('channel_url')

        try:
            browser = await launch(
                executablePath=settings.PYPPETEER_CHROME_PATH,
                headless=True,
                options={
                    'args': [
                        '--disable-gpu',
                        '--disable-dev-shm-usage',
                        '--disable-setuid-sandbox',
                        '--no-first-run',
                        '--no-sandbox',
                        '--no-zygote',
                        '--single-process'
                    ]
                }
            )
            page = await browser.newPage()
            page.on('request', lambda r, i=item: self.parse_m3u8(r, i))
            await page.goto(channel_url, waitUntil='networkidle0',
                            timeout=60000)
            await page.close()
        except (BrowserError, PageError, TimeoutError) as err:
            logger.warning(('Browser malfunctioning while trying to extract '
                            'the M3U8 link from {0}: "{1}"').format(
                                channel_url, str(err)))
        finally:
            await browser.close()

    def parse_m3u8(self, request, item):
        found = re.match(r'.*\.m3u8.*', request.url)

        if found:
            item['stream_url'] = found.group(0)

    def process_item(self, item, spider):
        logger.debug('Exctracting M3U8 link from {0}'.format(
            item.get('channel_url')))

        try:
            asyncio.get_event_loop().run_until_complete(
                self.parse_stream(item))
        except (IncompleteReadError, InvalidStateError,
                TimeoutErrorAsyncio) as err:
            logger.warning(
                'Asyncio malfunctioning while running puppeteer: {0}'.format(
                    str(err)))

        if item.get('stream_url'):
            logger.info('Found M3U8 link: {0}'.format(item.get('stream_url')))
            return item

        logger.warning('No M3U8 link found for {0}'.format(
            item.get('channel_url')))


class StreamVerificationPipeline(object):
    def process_item(self, item, spider):
        logger.debug('Verifying stream URL {0}'.format(
            item.get('stream_url', 'Not Found')))

        try:
            req = urllib.request.urlopen(item.get('stream_url'))
            item['is_active'] = req.getcode() == 200
        except URLError as err:
            logger.warning(
                'While trying to verify the stream: {0}'.format(str(err)))
            item['is_active'] = False

        logger.debug('[{0}] {1}'.format(
            'ON' if item.get('is_active') else 'OFF', item.get('stream_url')))
        return item


class MongoPipeline(MongoBasePipeline):
    def process_item(self, item, spider):
        logger.debug('Updating "{0}" collection with item: {1}'.format(
            self.collection_name, item))
        result = self.db[self.collection_name].update_one(
            {
                'quality': item.get('quality'),
                'priority': item.get('priority'),
                'channelId': item.get('channel_id'),
                'sourceId': item.get('source_id')
            },
            {
                '$set': {
                    'URL': item.get('stream_url'),
                    'quality': item.get('quality'),
                    'priority': item.get('priority'),
                    'channelId': item.get('channel_id'),
                    'sourceId': item.get('source_id'),
                    'isActive': item.get('is_active'),
                    'verifiedAt': datetime.datetime.utcfromtimestamp(
                        time.time())
                }
            },
            upsert=True
        )
        logger.info('Stream {0} successfully: {1}'.format(
            'updated' if result.modified_count else 'created',
            item.get('stream_url')))
        return item
