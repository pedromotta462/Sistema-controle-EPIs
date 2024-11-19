import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { EmployeeService } from 'src/services/employee/employee.service';
import { EmployeeController } from 'src/controllers/employee/employee.controller';
import { MailerService } from 'src/controllers/mailer/mailer.service';

@Module({
  providers: [EmployeeService, PrismaService, MailerService],
  controllers: [EmployeeController],
  exports: [EmployeeService],
})
export class EmployeeModule {}
