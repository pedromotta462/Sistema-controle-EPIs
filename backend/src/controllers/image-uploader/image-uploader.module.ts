import { Module } from '@nestjs/common';
import { ImageUploaderService } from './image-uploader.service';
import { ImageUploaderController } from './image-uploader.controller';
import { ConfigModule } from '@nestjs/config';
import { EmployeeService } from '../../services/employee/employee.service';
import { PrismaService } from '../../services/prisma/prisma.service';
import { MailerService } from '../../controllers/mailer/mailer.service';
import { AdminService } from '../../services/admin/admin.service';

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
