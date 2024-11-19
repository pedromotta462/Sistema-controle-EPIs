import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { env } from "process";
import { SendMailerDto } from './dto/send-mailer.dto';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailerService {

  constructor(
  ) {}

  mailTransport() {
    return nodemailer.createTransport({ 
      host: env.MAIL_HOST,
      port: env.MAIL_PORT as unknown as number,
      secure: false,
      auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASS,
      },
    });
  }

  async sendMail(dto: SendMailerDto) {
    const { from, to, subject, text, html } = dto;

    const transporter = this.mailTransport();

    const options: Mail.Options = {
      from: from ?? env.MAIL_USER,
      to,
      subject,
      text,
      html,
    };

    try {
      const result = await transporter.sendMail(options);

      return {
        status: 'success',
        message: 'Mail sent successfully',
        data: result,
      };
      
    } catch (error) {
      console.error('Error:', error);
      throw new InternalServerErrorException({
        status: 'error',
        message: 'Mail not sent',
        data: error,
      });
    }
  }
}
