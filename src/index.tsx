// TODO: Configuration
// TODO: Error handling (Notify Mattermost)

import { render } from "@react-email/render"
import nodemailer from 'nodemailer'

// TODO: Add bullmq

// Own Email templates
// TODO: load all mail templates
import ConfirmEmailAddress from '../emails/confirm-email'

// TODO: use configuration
// TODO: checkout nodemailer and mailgun
const transporter = nodemailer.createTransport({
    host: '',
    port: 587,
    secure: true,
    auth: {
        user: '',
        pass: ''
    }
})

// TODO: render correct mail template based on bullmq message
const emailHtml = render(ConfirmEmailAddress({}))

const options = {
    from: '',
    to: '',
    subject: '',
    html: emailHtml
}

transporter.sendEmail(options)