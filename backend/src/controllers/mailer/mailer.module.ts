import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { PrismaService } from '../../services/prisma/prisma.service';

@Module({
  controllers: [MailerController],
  providers: [MailerService, PrismaService],
})
export class MailerModule {}
