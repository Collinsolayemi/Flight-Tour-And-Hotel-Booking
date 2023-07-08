"use strict";
// import { Injectable, InternalServerErrorException } from '@nestjs/common';
// import { Twilio } from 'twilio';
// @Injectable()
// export class TwilioService {
//   private readonly client: Twilio;
//   constructor() {
//     this.client = new Twilio(
//         process.env.SID,
//            process.env.TWILIO_AUTH_TOKEN,
//     );
//   }
//   async sendVerificationCode(phoneNumber: string, code: string): Promise<void> {
//     try {
//       await this.client.messages.create({
//         body: `Your verification code is: ${code}`,
//         from: '+14027288652',
//         to: phoneNumber,
//       });
//     } catch (error) {
//       console.error('Error sending verification code:', error);
//       throw new InternalServerErrorException(
//         'Failed to send verification code',
//       );
//     }
//   }
// }
