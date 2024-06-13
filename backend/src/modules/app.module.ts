import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { FuncionarioModule } from './employee/employee.module';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { EpiModule } from './epi/epi.module';
import { RemovalModule } from './removal/removal.module';


@Module({
  imports: [
    FuncionarioModule,
    EpiModule,
    RemovalModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
  ],
})
export class AppModule {}
