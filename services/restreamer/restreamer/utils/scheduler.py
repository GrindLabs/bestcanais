from apscheduler.executors.pool import ProcessPoolExecutor, ThreadPoolExecutor
from apscheduler.jobstores.mongodb import MongoDBJobStore
from pymongo import MongoClient

from restreamer import settings


def get_scheduler_config():
    """Scheduler pre-setup

    Returns:
        Tuple -- The pre-set data
    """
    jobstores = {
        'default': MongoDBJobStore(
            database=settings.MONGODB_NAME,
            collection=settings.SCHEDULER_MONGODB_COLLECTION,
            client=MongoClient(settings.MONGODB_URI)
        )
    }
    executors = {
        'default': ThreadPoolExecutor(settings.SCHEDULER_MAX_THREADS),
        'processpool': ProcessPoolExecutor(
            settings.SCHEDULER_MAX_PROCESSES)
    }
    job_defaults = {
        'coalesce': False,
        'max_instances': settings.SCHEDULER_MAX_INSTANCES
    }

    return (jobstores, executors, job_defaults)
