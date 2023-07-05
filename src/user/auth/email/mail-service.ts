 import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as sendGridTransport from 'nodemailer-sendgrid-transport';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Create a nodemailer transporter
    // this.transporter = nodemailer.createTransport({
    //   host: 'smtp.sendgrid.net',

    //   auth: {
    //     user: 'apikey',
    //     pass: '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',
    //     pass: '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',
    //   },
    //   secure: true, // Enable secure connection (SSL/TLS)
    // });


    

    
   
  }

  async send(options: {
    to: string;
    subject: string;
    text: string;
  }): Promise < boolean > {
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
    } catch(error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
  }

