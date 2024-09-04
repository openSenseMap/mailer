import type { Job } from "bullmq";

// Import logger
import logger from "../logger";

// Nodemailer transporter
import transporter from "../transporter";

// Import Mail templates and subjects
import ConfirmEmail, {
  subject as ConfirmEmailSubject,
} from "../../emails/confirm-email";
import DeleteUserEmail, {
  subject as DeleteUserEmailSubject,
} from "../../emails/delete-user";
import NewDeviceEmail, {
  subject as NewDeviceEmailSubject,
} from "../../emails/new-device";
import NewDeviceHackairEmail, {
  subject as NewDeviceHackairEmailSubject,
} from "../../emails/new-device-hackair";
import NewDeviceLuftdatenEmail, {
  subject as NewDeviceLuftdatenEmailSubject,
} from "../../emails/new-device-luftdaten";
import NewSketchEmail, {
  subject as NewSketchEmailSubject,
} from "../../emails/new-sketch";
import NewUserEmail, {
  subject as NewUserEmailSubject,
} from "../../emails/new-user";
import PasswordResetEmail, {
  subject as PasswordResetEmailSubject,
} from "../../emails/password-reset";
import ResendEmailConfirmationEmail, {
  subject as ResendEmailConfirmationEmailSubject,
} from "../../emails/resend-email-confirmation";
import Mail from "nodemailer/lib/mailer";
import { render } from "@react-email/components";

interface Recipient {
  address: string;
  name: string;
}
interface Attachment {
  filename: string;
  contents: string;
}
interface Payload {
  template:
    | "confirmEmail"
    | "deleteUser"
    | "newBox"
    | "newBoxHackAir"
    | "newBoxLuftdaten"
    | "newSketch"
    | "newUser"
    | "passwordReset"
    | "resendEmailConfirmation";
  lang: "en_US" | "de_DE";
  recipient: Recipient;
  payload: {
    user: any;
    token: string;
    email: string;
    box: any;
  };
  attachment: Attachment;
}

export default async function (job: Job) {
  console.log("Picked up a job");
  console.log(job.data);

  const apiPayload: Payload = job.data;
  let subject;
  let emailHtml;
  const attachments: Mail.Attachment[] = [];

  let lang: "de" | "en" = "en";

  if (apiPayload.lang) {
    switch (apiPayload.lang.split("_")[0].toLowerCase()) {
      case "de":
        lang = "de";
        break;
      case "en":
        lang = "en";
      default:
        lang = "en";
        break;
    }
  }

  switch (apiPayload.template) {
    case "confirmEmail":
      subject = ConfirmEmailSubject;
      emailHtml = await render(
        ConfirmEmail({
          user: apiPayload.payload.user,
          token: apiPayload.payload.token,
          email: apiPayload.payload.email,
          language: lang,
        })
      );
      break;
    case "deleteUser":
      subject = DeleteUserEmailSubject;
      emailHtml = await render(
        DeleteUserEmail({
          user: apiPayload.payload.user,
          language: lang,
        })
      );
      break;
    case "newBox":
      subject = NewDeviceEmailSubject;
      emailHtml = await render(
        NewDeviceEmail({
          user: apiPayload.payload.user,
          device: apiPayload.payload.box,
          language: lang,
        })
      );
      attachments.push({
        filename: apiPayload.attachment.filename,
        content: apiPayload.attachment.contents,
        encoding: "base64",
      });
      break;
    case "newBoxHackAir":
      subject = NewDeviceHackairEmailSubject;
      emailHtml = await render(
        NewDeviceHackairEmail({
          user: apiPayload.payload.user,
          device: apiPayload.payload.box,
          language: lang,
        })
      );
      break;
    case "newBoxLuftdaten":
      subject = NewDeviceLuftdatenEmailSubject;
      emailHtml = await render(
        NewDeviceLuftdatenEmail({
          user: apiPayload.payload.user,
          device: apiPayload.payload.box,
          language: lang,
        })
      );
      break;
    case "newSketch":
      subject = NewSketchEmailSubject;
      emailHtml = await render(
        NewSketchEmail({
          user: apiPayload.payload.user,
          device: apiPayload.payload.box,
          language: lang,
        })
      );
      attachments.push({
        filename: apiPayload.attachment.filename,
        content: apiPayload.attachment.contents,
        encoding: "base64",
      });
      break;
    case "newUser":
      subject = NewUserEmailSubject;
      emailHtml = await render(
        NewUserEmail({
          user: apiPayload.payload.user,
          email: apiPayload.payload.email,
          token: apiPayload.payload.token,
          language: lang,
        })
      );
      break;
    case "passwordReset":
      subject = PasswordResetEmailSubject;
      emailHtml = await render(
        PasswordResetEmail({
          user: apiPayload.payload.user,
          email: apiPayload.payload.email,
          token: apiPayload.payload.token,
          language: lang,
        })
      );
      break;
    case "resendEmailConfirmation":
      subject = ResendEmailConfirmationEmailSubject;
      emailHtml = await render(
        ResendEmailConfirmationEmail({
          user: apiPayload.payload.user,
          token: apiPayload.payload.token,
          email: apiPayload.payload.email,
          language: lang,
        })
      );
      break;
    default:
      // throw error template not found
      break;
  }

  const info = await transporter.sendMail({
    from: '"openSenseMap 🌍" <no-reply@opensensemap.org>', // sender address
    to: `"${apiPayload.recipient.name}" <${apiPayload.recipient.address}>`, // list of receivers
    subject: subject ? subject[lang] : "openSenseMap", // Subject line
    html: emailHtml, // html body
    attachments: attachments,
  });

  logger.info(info);
}
