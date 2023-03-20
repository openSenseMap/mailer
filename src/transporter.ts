import config from "./config";

import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import logger from "./logger";

let transportOptions: SMTPTransport.Options = {
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: config.SMTP_SECURE,
};

if (config.SMTP_USERNAME !== "ignored" && config.SMTP_PASSWORD !== "ignored") {
  transportOptions["auth"] = {
    user: config.SMTP_USERNAME,
    pass: config.SMTP_PASSWORD,
  };
}

const transporter = nodemailer.createTransport(transportOptions);

export default transporter;
