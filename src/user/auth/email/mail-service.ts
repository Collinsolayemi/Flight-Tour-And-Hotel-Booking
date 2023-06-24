import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';


@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
   

    // Create a nodemailer transporter
    this.transporter = nodemailer.createTransport({
      // Specify your email service provider and credentials
      service: 'gmail',
      auth: {
        user: process.env.NAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      secure: true, // Enable secure connection (SSL/TLS)
    });
  }

  async send(options: {
    to: string;
    subject: string;
    text: string;
  }): Promise<boolean> {
    try {
      // Compose the email
      const mailOptions = {
        from: process.env.NAME,
        to: options.to,
        subject: options.subject,
        text: options.text,
      };

      // Send the email
      const info = await this.transporter.sendMail(mailOptions);

      console.log('Email sent:', info.messageId);

      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}
