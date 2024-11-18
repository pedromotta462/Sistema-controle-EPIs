import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Funcionario, Prisma } from '@prisma/client';
import * as argon2 from 'argon2';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.FuncionarioCreateInput): Promise<Funcionario> {
    if (!data.senha) throw new Error('Senha é obrigatório');

    data.senha = await argon2.hash(data.senha);
    return this.prisma.funcionario.create({ data });
  }

  async findAll(): Promise<Funcionario[]> {
    return this.prisma.funcionario.findMany();
  }

  async findOne(
    employeeWhereUniqueInput: Prisma.FuncionarioWhereUniqueInput,
  ): Promise<Funcionario> {
    const funcionario = await this.prisma.funcionario.findUnique({
      where: employeeWhereUniqueInput,
    });

    if (!funcionario) {
      throw new NotFoundException(
        `Funcionario with Input "${JSON.stringify(employeeWhereUniqueInput)}" not found`,
      );
    }
    return funcionario;
  }

  async update(where: Prisma.FuncionarioWhereUniqueInput, data: Prisma.FuncionarioUpdateInput): Promise<Funcionario> {
    const funcionario = await this.findOne(where);
    if (!funcionario) {
      throw new NotFoundException(`Funcionario with Input ${where} not found`);
    }
    return this.prisma.funcionario.update({
      where: where,
      data,
    });
  }

  async remove(where: Prisma.FuncionarioWhereUniqueInput): Promise<Funcionario> {
    const funcionario = await this.findOne(where);
    
    if (!funcionario) {
      throw new NotFoundException(`Funcionario with Input ${where} not found`);
    }
    return this.prisma.funcionario.delete({ where: where });
  }
}
