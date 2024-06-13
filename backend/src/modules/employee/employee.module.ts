import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { EmployeeService } from 'src/services/employee/employee.service';

@Module({
  providers: [EmployeeService, PrismaService],
  exports: [EmployeeService],
})
export class FuncionarioModule {}
