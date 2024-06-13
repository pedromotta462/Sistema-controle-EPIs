import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Retirada } from '@prisma/client';

@Injectable()
export class RemovalService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Retirada): Promise<Retirada> {
    return this.prisma.retirada.create({ data });
  }

  async findAll(): Promise<Retirada[]> {
    return this.prisma.retirada.findMany();
  }

  async findOne(id: string): Promise<Retirada> {
    const retirada = await this.prisma.retirada.findUnique({ where: { id } });
    if (!retirada) {
      throw new NotFoundException(`Retirada with ID "${id}" not found`);
    }
    return retirada;
  }

  async update(id: string, data: Retirada): Promise<Retirada> {
    const retirada = await this.findOne(id);
    if (!retirada) {
      throw new NotFoundException(`Retirada with ID "${id}" not found`);
    }
    return this.prisma.retirada.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Retirada> {
    const retirada = await this.findOne(id);
    if (!retirada) {
      throw new NotFoundException(`Retirada with ID "${id}" not found`);
    }
    return this.prisma.retirada.delete({ where: { id } });
  }
}
