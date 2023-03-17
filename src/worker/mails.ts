import { render } from "@react-email/render";
import type { Job } from "bullmq";

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
  switch (apiPayload.template) {
    case "confirmEmail":
      subject = ConfirmEmailSubject;
      emailHtml = render(
        ConfirmEmail({
          user: apiPayload.payload.user,
          token: apiPayload.payload.token,
          email: apiPayload.payload.email,
        })
      );
      break;
    case "deleteUser":
      subject = DeleteUserEmailSubject;
      emailHtml = render(
        DeleteUserEmail({
          user: apiPayload.payload.user,
        })
      );
      break;
    case "newBox":
      subject = NewDeviceEmailSubject;
      emailHtml = render(
        NewDeviceEmail({
          user: apiPayload.payload.user,
          device: apiPayload.payload.box,
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
      emailHtml = render(
        NewDeviceHackairEmail({
          user: apiPayload.payload.user,
          device: apiPayload.payload.box,
        })
      );
      break;
    case "newBoxLuftdaten":
      subject = NewDeviceLuftdatenEmailSubject;
      emailHtml = render(
        NewDeviceLuftdatenEmail({
          user: apiPayload.payload.user,
          device: apiPayload.payload.box,
        })
      );
      break;
    case "newSketch":
      subject = NewSketchEmailSubject;
      emailHtml = render(
        NewSketchEmail({
          user: apiPayload.payload.user,
          device: apiPayload.payload.box,
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
      emailHtml = render(
        NewUserEmail({
          user: apiPayload.payload.user,
          email: apiPayload.payload.email,
          token: apiPayload.payload.token,
        })
      );
      break;
    case "passwordReset":
      subject = PasswordResetEmailSubject;
      emailHtml = render(
        PasswordResetEmail({
          user: apiPayload.payload.user,
          email: apiPayload.payload.email,
          token: apiPayload.payload.token,
        })
      );
      break;
    case "resendEmailConfirmation":
      subject = ResendEmailConfirmationEmailSubject;
      emailHtml = render(
        ResendEmailConfirmationEmail({
          user: apiPayload.payload.user,
          token: apiPayload.payload.token,
          email: apiPayload.payload.email,
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
    subject: subject, // Subject line
    html: emailHtml, // html body
    attachments: attachments,
  });

  console.log(info);
}
