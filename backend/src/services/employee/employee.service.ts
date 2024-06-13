import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Funcionario } from '@prisma/client';


@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Funcionario): Promise<Funcionario> {
    return this.prisma.funcionario.create({ data });
  }

  async findAll(): Promise<Funcionario[]> {
    return this.prisma.funcionario.findMany();
  }

  async findOne(id: string): Promise<Funcionario> {
    const funcionario = await this.prisma.funcionario.findUnique({
      where: { id },
    });
    if (!funcionario) {
      throw new NotFoundException(`Funcionario with ID "${id}" not found`);
    }
    return funcionario;
  }

  async update(id: string, data: Funcionario): Promise<Funcionario> {
    const funcionario = await this.findOne(id);
    if (!funcionario) {
        throw new NotFoundException(`Funcionario with ID ${id} not found`);
      }
    return this.prisma.funcionario.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Funcionario> {
    const funcionario = await this.findOne(id);
    if (!funcionario) {
      throw new NotFoundException(`Funcionario with ID ${id} not found`);
    }
    return this.prisma.funcionario.delete({ where: { id } });
  }
}
