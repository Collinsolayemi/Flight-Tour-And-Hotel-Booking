import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as sendGridTransport from 'nodemailer-sendgrid-transport';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Create a nodemailer transporter
   

    
  }

  async send(options: {
    to: string;
    subject: string;
    text: string;
  }): Promise<boolean> {
    try {
      // Compose the email
      const mailOptions = {
        from: 'Travel Hotline <travelhotline@info>',
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
