import { Logger } from '@nestjs/common';
import axios from 'axios';

const BASE_URL = 'https://api.sendgrid.com';

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
  try {
    const isValidEmail = /\S+@\S+\.\S+/.test(to);
    if (!isValidEmail) {
      console.error('Invalid email address : ' + to);
      return;
    }
    const emailData = {
      personalizations: [
        {
          to: [{ email: to }],
        },
      ],
      from: {
        email: process.env.USER_MAIL,
        name: 'Dar Iwen', //
      },
      subject,
      content: [
        {
          type: 'text/plain',
          value: text,
        },
        {
          type: 'text/html',
          value: html,
        },
      ],
    };

    await axios.post(`${BASE_URL}/v3/mail/send`, emailData, {
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    Logger.log('Email sent to ' + to);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      Logger.error(error.response?.data);
    } else {
      Logger.error('Error sending email:' + error);
    }
  }
}
