import { Module } from '@nestjs/common';
import { ImageUploaderService } from './image-uploader.service';
import { ImageUploaderController } from './image-uploader.controller';
import { ConfigModule } from '@nestjs/config';
import { EmployeeService } from 'src/services/employee/employee.service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { MailerService } from 'src/controllers/mailer/mailer.service';
import { AdminService } from 'src/services/admin/admin.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    ImageUploaderService,
    EmployeeService,
    MailerService,
    PrismaService,
    AdminService,
  ],
  controllers: [ImageUploaderController]
})
export class ImageUploaderModule {}
