import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Devolucao } from '@prisma/client';

@Injectable()
export class DevolutionService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Devolucao): Promise<Devolucao> {
    return this.prisma.devolucao.create({ data });
  }

  async findAll(): Promise<Devolucao[]> {
    return this.prisma.devolucao.findMany();
  }

  async findOne(id: string): Promise<Devolucao> {
    const devolucao = await this.prisma.devolucao.findUnique({ where: { id } });
    if (!devolucao) {
      throw new NotFoundException(`Devolucao with ID "${id}" not found`);
    }
    return devolucao;
  }

  async update(id: string, data: Devolucao): Promise<Devolucao> {
    const devolucao = await this.findOne(id);
    if (!devolucao) {
      throw new NotFoundException(`Devolucao with ID "${id}" not found`);
    }
    return this.prisma.devolucao.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Devolucao> {
    const devolucao = await this.findOne(id);
    if (!devolucao) {
      throw new NotFoundException(`Devolucao with ID "${id}" not found`);
    }
    return this.prisma.devolucao.delete({ where: { id } });
  }
}
