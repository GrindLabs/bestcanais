import datetime
import time

import requests

from restreamer import settings
from restreamer.models.streams import Streams
from restreamer.utils.log import get_logger


def check_streams():
    """Test all available streams"""
    logger = get_logger()
    logger.info('Starting the streams verification...')
    streams = Streams.objects()
    logger.debug('Found {0} available streams'.format(len(streams)))

    for stream in streams:
        logger.info(
            'Checking stream {0} of channel {1} from source {2}'.format(
                stream.url, stream.channel.name, stream.source.name))
        is_available = is_stream_available(stream.url)
        logger.info('The stream {0} of channel {1} from source {2} {3}'.format(
            stream.url, stream.channel.name, stream.source.name,
            'is available' if is_available else 'is not available'))

        if is_available != stream.is_active:
            stream.is_active = is_available
            stream.verified_at = datetime.datetime.utcnow()
            stream.save()

        time.sleep(settings.DEFAULT_STREAM_UPDATE_DELAY)

    logger.info('Finished the streams verification')


def is_stream_available(url):
    """Check if a stream URL is available

    Arguments:
        url {string} -- The stream URL

    Returns:
        Bool -- True if the stream URL is available, False otherwise
    """
    logger = get_logger()
    session = requests.Session()

    try:
        r = session.get(url, timeout=settings.DEFAULT_STREAM_UPDATE_TIMEOUT)
        is_available = r.status_code >= 200 and r.status_code < 400
    except requests.exceptions.RequestException as err:
        logger.error(
            'While checking the stream {0} availability: {1}'.format(
                url, str(err)))
        is_available = False

    logger.debug('Is the Stream {0} available? {1}'.format(url, is_available))
    return is_available
