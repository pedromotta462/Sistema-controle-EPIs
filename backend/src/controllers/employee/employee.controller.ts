import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeService } from '../../services/employee/employee.service';
import { Funcionario, Prisma } from '@prisma/client'; 

@Controller('employee')
export class EmployeeController {
  constructor(private readonly funcionarioService: EmployeeService) {}

  @Post()
  create(@Body() data: Funcionario) {
    return this.funcionarioService.create(data);
  }

  @Get()
  findAll() {
    return this.funcionarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') where: Prisma.FuncionarioWhereUniqueInput) {
    return this.funcionarioService.findOne(where);
  }

  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() data: Prisma.FuncionarioUpdateInput,
  ) {
    const where: Prisma.FuncionarioWhereUniqueInput = { id };

    return this.funcionarioService.update(where, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const where: Prisma.FuncionarioWhereUniqueInput = { id };

    return this.funcionarioService.remove(where);
  }
}
