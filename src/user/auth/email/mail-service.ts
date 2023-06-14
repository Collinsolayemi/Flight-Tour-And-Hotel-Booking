// import { Injectable } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';
// import { getMaxListeners } from 'process';

// @Injectable()
// export class MailService {
//   async send(options: {
//     to: string;
//     subject: string;
//     text: string;
//   }): Promise<boolean> {
//     try {
//       //Create a nodemailer transporter
//       const transporter = nodemailer.createTransport({
//           // Specify your email service provider and credentials
//           service: 'gmail',
//           auth: {
//             user: 'collinsolayemi@gmail.com',
//             pass: 'Babasturborn',
//           },
//         });

      

//       // Compose the email
//       const mailOptions = {
//         from: 'collinsolayemi@gmail.com',
//         to: options.to,
//         subject: options.subject,
//         text: options.text,
//       };

//       // Send the email
//       const info = await transporter.sendMail(mailOptions);

//       console.log('Email sent:', info.messageId);

//       return true;
//     } catch (error) {
//       console.error('Error sending email:', error);
//       return false;
//     }
//   }
// }


import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    dotenv.config();

    // Create a nodemailer transporter
    this.transporter = nodemailer.createTransport({
      // Specify your email service provider and credentials
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      secure: true, // Enable secure connection (SSL/TLS)
    });
  }

  async send(options: { to: string; subject: string; text: string }): Promise<boolean> {
    try {
      // Compose the email
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
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
