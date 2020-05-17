# -*- coding: utf-8 -*-

# Define here the processors for your items loaders
#
# See: https://docs.scrapy.org/en/latest/topics/loaders.html#input-and-output-processors

import re

from streamerbot import settings


def extract_quality(value):
    """Extract the quality value from the channel title

    Arguments:
        value {string} -- The channel name

    Returns:
        int -- The quality value
    """
    quality = re.search(r'({0})$'.format(
        '|'.join(list(settings.STREAM_PRIORITY.keys()))), value)

    if quality:
        return settings.STREAM_PRIORITY.get(quality.group(0))

    return settings.STREAM_PRIORITY.get('SD')
