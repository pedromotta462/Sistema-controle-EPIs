import { Controller, Post, Body, Request, UseGuards, NotAcceptableException } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendMailerDto, SendMailerSupportDto } from './dto/send-mailer.dto';
import { AuthGuard } from '../../controllers/auth/auth.guard';
import { supportEmailTemplate } from './constants';

@Controller('mailer')
export class MailerController {
  constructor(
    private readonly mailerService: MailerService,
  ) {}

  @Post('send')
  create(@Body() createMailerDto: SendMailerDto) {
    return this.mailerService.sendMail(createMailerDto);
  }

  @UseGuards(AuthGuard)
  @Post('send-support')
  async createSupport(@Request() req, @Body() createMailerDto: SendMailerSupportDto) {

    if(!createMailerDto.subject || !createMailerDto.text) {
      throw new NotAcceptableException("Subject and text are required");
    }
    
    const user = req.user;
    
    
    const mailerObj = {
      to: [process.env.MAIL_USER, user.email],
      subject: createMailerDto.subject,
      text: createMailerDto.text,
      html: supportEmailTemplate(createMailerDto.text),
    }
    
    return await this.mailerService.sendMail(mailerObj);
  }
}
