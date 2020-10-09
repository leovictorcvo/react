import Bee from 'bee-queue';
import SubscriptionMailJob from '../app/jobs/SubscriptionMailJob';
import redisConfig from '../config/redis';

const jobs = [SubscriptionMailJob];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queueKey, job) {
    return this.queues[queueKey].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name} FAILED: `, err);
  }
}

export default new Queue();
