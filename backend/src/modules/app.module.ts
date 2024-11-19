import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { EmployeeModule } from './employee/employee.module';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { EpiModule } from './epi/epi.module';
import { RemovalModule } from './removal/removal.module';
import { DevolutionModule } from './devolution/devolution.module';
import { NotificationModule } from './notification/notification.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from 'src/controllers/auth/auth.module';
import { MailerModule } from 'src/controllers/mailer/mailer.module';
import { ImageUploaderModule } from 'src/controllers/image-uploader/image-uploader.module';

@Module({
  imports: [
    EmployeeModule,
    EpiModule,
    RemovalModule,
    DevolutionModule,
    NotificationModule,
    AdminModule,
    AuthModule,
    MailerModule,
    ImageUploaderModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    PrismaService,
  ],
})
export class AppModule {}
