import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeeService } from '../../services/employee/employee.service';
import { Funcionario } from '@prisma/client'; 

@Controller('funcionarios')
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
  findOne(@Param('id') id: string) {
    return this.funcionarioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Funcionario) {
    return this.funcionarioService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.funcionarioService.remove(id);
  }
}
