import { Worker } from "bullmq";

// Import config
import config from "./config";

// Import logger
import logger from "./logger";

// Nodemailer transporter
import transporter from "./transporter";

// Bullmq worker
import processMail from "./worker/mails";

let worker: Worker;

async function main() {
  try {
    const verified = await transporter.verify();
    logger.info(`Nodemailer transporter verified: ${verified}`);

    worker = new Worker(config.BULLMQ_QUEUE_NAME || "queue", processMail, {
      connection: {
        host: config.REDIS_HOST,
        port: config.REDIS_PORT,
        username: config.REDIS_USERNAME,
        password: config.REDIS_PASSWORD,
        db: config.REDIS_DB,
      },
      autorun: false,
    });

    worker.on("error", (err) => {
      logger.error(err);
    });

    // Start worker
    worker.run();
  } catch (error) {
    logger.error(error);
  }
}

process.on("uncaughtException", function (err) {
  // Handle the error safely
  logger.error(err, "Uncaught exception");
});

process.on("unhandledRejection", (reason, promise) => {
  // Handle the error safely
  logger.error({ promise, reason }, "Unhandled Rejection at: Promise");
});

process.on("SIGINT", async () => {
  logger.info("Going to close worker connection...");
  await worker.close();
  logger.info("Worker was closed!");
  logger.info("Going to close transporter connection...");
  await transporter.close();
  logger.info("Transporter was closed!");
});

// 🔥 Fire it up!
main();
