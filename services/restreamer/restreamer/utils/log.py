import logging
import logging.config
import os

import yaml

from restreamer import settings


def setup_logger():
    """Load and setup the logger configuration
    """
    logger_path = os.path.join(os.path.dirname(__file__), '../logger.yaml')

    with open(logger_path, 'r') as file:
        config = yaml.safe_load(file.read())
        logging.config.dictConfig(config)


def get_logger():
    """Get the logger according the environment

    Returns:
        logger -- The logger instance
    """
    logger_name = 'development' if settings.DEBUG else 'production'
    return logging.getLogger(logger_name)
