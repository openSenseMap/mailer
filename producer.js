import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import { Queue, QueueEvents } from "bullmq";

const connection = {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  db: process.env.REDIS_DB,
};

const queue = new Queue(process.env.BULLMQ_QUEUE_NAME, {
  connection: connection,
});
const queueEvents = new QueueEvents(process.env.BULLMQ_QUEUE_NAME, {
  connection: connection
});

queue.on("waiting", (job) => {
  console.log(`Job is waiting to be processed: `, job.id);
});

queueEvents.on('completed', (job) => {
  console.log('Job was completed: ', job.id);
});

async function main () {
  queue.add(
    "test1234",
    { foo: "baz", error: true },
    { removeOnComplete: true }
  );
}

main()
// queue.close()
