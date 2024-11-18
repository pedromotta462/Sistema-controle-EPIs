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

@Module({
  imports: [
    EmployeeModule,
    EpiModule,
    RemovalModule,
    DevolutionModule,
    NotificationModule,
    AdminModule,
    AuthModule,
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
