import { render } from "@react-email/render";
import type { Job } from "bullmq";
import NewUserEmail, { subject } from "../../emails/new-user";

// Nodemailer transporter
import transporter from "../transporter";

export default async function (job: Job) {
  console.log("Picked up a job");
  console.log(job.data);

  const emailHtml = render(
    NewUserEmail({
      user: { name: "" },
      token: "",
      email: "",
    })
  );

  const info = await transporter.sendMail({
    from: '"openSenseMap 🌍" <no-reply@opensensemap.org>', // sender address
    to: "", // list of receivers
    subject: subject, // Subject line
    html: emailHtml, // html body
  });

  console.log(info);
}
