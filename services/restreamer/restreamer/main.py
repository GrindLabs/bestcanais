import signal

from apscheduler.schedulers import SchedulerNotRunningError
from apscheduler.schedulers.blocking import BlockingScheduler
from mongoengine import connect
from pymongo.errors import ServerSelectionTimeoutError

from restreamer import settings
from restreamer.utils.log import get_logger, setup_logger
from restreamer.utils.scheduler import get_scheduler_config
from restreamer.utils.stream import check_streams


def main():
    logger = get_logger()

    try:
        logger.info('Connecting to MongoDB...')
        mongo_conn = connect(settings.MONGODB_NAME, host=settings.MONGODB_URI)
        jobstores, executors, job_defaults = get_scheduler_config()
        restreamer = BlockingScheduler(
            jobstores=jobstores,
            executors=executors,
            job_defaults=job_defaults
        )
        restreamer.add_job(
            check_streams,
            'interval',
            id=settings.SCHEDULER_JOB_VERIFY_ID,
            minutes=settings.SCHEDULER_STREAM_VERIFY,
            replace_existing=True
        )

        def gracefully_exit(signum=None, frame=None):
            """Shutdown any connections or subprocesses before exit

            Keyword Arguments:
                signum {signal} -- The signal sent by the OS (default: {None})
                frame {object} -- The Stack Frame (default: {None})
            """
            logger.info('Gracefully exiting...')

            try:
                logger.info('Disconecting from MongoDB...')
                mongo_conn.close()

                if 'restreamer' in locals():
                    logger.info('Shutting down the ReStreamer...')
                    restreamer.shutdown()
                    logger.info('ReStreamer is down')
            except SchedulerNotRunningError:
                logger.warning('No instance of ReStreamer to shutdown')
            except Exception as err:
                logger.warning('While shutting down: {0}'.format(str(err)))
            finally:
                logger.info('Done!')

        signal.signal(signal.SIGTERM, gracefully_exit)
        logger.info('Starting the ReStreamer...')
        restreamer.start()
    except ServerSelectionTimeoutError:
        logger.critical('Unable to connect to MongoDB')
    except (KeyboardInterrupt, SystemExit):
        logger.warning('The service was manually interrupted')
    except Exception as err:
        logger.error('There is something wrong: {0}'.format(str(err)))
    finally:
        gracefully_exit()


if __name__ == '__main__':
    setup_logger()
    main()
