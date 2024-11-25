import { Module } from '@nestjs/common';
import { PrismaService } from '../../services/prisma/prisma.service';
import { EmployeeService } from '../../services/employee/employee.service';
import { EmployeeController } from '../../controllers/employee/employee.controller';
import { MailerService } from '../../controllers/mailer/mailer.service';

@Module({
  providers: [EmployeeService, PrismaService, MailerService],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {}
