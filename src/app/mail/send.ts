import { Logger } from '@nestjs/common';
import nodemailer from 'nodemailer';

export async function sendMail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  await sendMailWithNodeMailer({ to, subject, text, html });
}

async function sendMailWithNodeMailer({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'us2.smtp.mailhostbox.com',
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Use environment variables
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `دار إيوان <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    Logger.log('Message sent:' + info.messageId);
  } catch (error) {
    Logger.error('Error sending email:' + error);
  }
}
