import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

import { Queue } from "bullmq";

const MAIL_TEMPLATE = process.env.MAIL_TEMAPLTE || "confirmEmail";

import confirmEmailPayload from './payloads/confirmEmail.json' assert { type: 'json'};
import deleteUserPayload from './payloads/deleteUser.json' assert { type: 'json'};
import newDevicePayload from './payloads/newDevice.json' assert { type: 'json'};
import newDeviceHackairPayload from './payloads/newDeviceHackair.json' assert { type: 'json'};
import newDeviceLuftdatenPayload from './payloads/newDeviceLuftdaten.json' assert { type: 'json'};
import newSketchPayload from './payloads/newSketch.json' assert { type: 'json'};
import newUserPayload from './payloads/newUser.json' assert { type: 'json'};
import passwordResetPayload from './payloads/passwordReset.json' assert { type: 'json'};
import resendEmailConfirmationPayload from './payloads/resendEmailConformation.json' assert { type: 'json'};

const payloads = {
  confirmEmail: confirmEmailPayload,
  deleteUser: deleteUserPayload,
  newDevice: newDevicePayload,
  newDeviceHackair: newDeviceHackairPayload,
  newDeviceLuftdaten: newDeviceLuftdatenPayload,
  newSketch: newSketchPayload,
  newUser: newUserPayload,
  passwordReset: passwordResetPayload,
  resendEmailConfirmation: resendEmailConfirmationPayload
}

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

console.log(`ℹ️: Going to add ${MAIL_TEMPLATE} payload to the queue.`);
queue.add(
  MAIL_TEMPLATE,
  payloads[MAIL_TEMPLATE],
  { removeOnComplete: true }
);

queue.close();
