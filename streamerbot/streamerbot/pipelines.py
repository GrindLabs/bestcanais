# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html

import datetime
import time

import requests
from pymongo import MongoClient
from requests.exceptions import HTTPError

from streamerbot import settings
from streamerbot.settings import logger


class MongoBasePipeline(object):
    collection_name = 'channels'

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


class ExtractM3U8Pipeline(object):
    def process_item(self, item, spider):
        logger.info('Exctracting M3U8 from {0}'.format(
            item.get('url')))
        payload = {
            'method': 'extractStream',
            'params': {
                'url': item.get('url'),
                'ext': 'm3u8'
            },
            'jsonrpc': '2.0',
            'id': int(time.time())
        }
        logger.debug('Payload: {0}'.format(payload))
        result = requests.post(settings.PUPPETEER_SERVICE_URL, json=payload)
        logger.debug('Puppeteer service status: {0}'.format(
            result.status_code))

        try:
            result.raise_for_status()
            json_data = result.json()
            item['stream_url'] = json_data.get('result', None)
            logger.info('Extracted M3U8 link: {0}'.format(
                item.get('stream_url')
                if item.get('stream_url')
                else 'not found'))
        except HTTPError as err:
            logger.warning(
                'Unable to reach the Puppeteer Service: {0}'.format(str(err)))
            item['stream_url'] = None

        return item


class StreamVerificationPipeline(object):
    def process_item(self, item, spider):
        if not item.get('stream_url'):
            logger.warning('There is no stream URL to verify... skipping')
            item['is_active'] = False
            return item

        logger.info('Verifying stream URL {0}'.format(
            item.get('stream_url')))

        result = requests.get(item.get('stream_url'))

        try:
            result.raise_for_status()
            item['is_active'] = result.status_code == 200
        except HTTPError as err:
            logger.warning(
                'Unable to verify the stream URL: {0}'.format(str(err)))
            item['is_active'] = False

        logger.info('[{0}] {1}'.format(
            'ON' if item.get('is_active') else 'OFF', item.get(
                'stream_url')))

        return item


class MongoPipeline(MongoBasePipeline):
    def process_item(self, item, spider):
        logger.debug('Updating "{0}" collection with item: {1}'.format(
            self.collection_name, item))
        result = self.db[self.collection_name].update_one(
            {
                'url': item.get('url'),
                'sourceId': item.get('source_id')
            },
            {
                '$set': {
                    'name': item.get('name'),
                    'slug': item.get('slug'),
                    'logo': item.get('logo'),
                    'quality': item.get('quality'),
                    'url': item.get('url'),
                    'stream_url': item.get('stream_url'),
                    'isActive': item.get('is_active'),
                    'sourceId': item.get('source_id'),
                    'verifiedAt': datetime.datetime.utcfromtimestamp(
                        time.time())
                }
            },
            upsert=True
        )
        logger.info('Channel {0} successfully: {1}'.format(
            'updated' if result.modified_count else 'created',
            item.get('name')))
        return item
