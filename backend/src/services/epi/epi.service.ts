import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EPI } from '@prisma/client';


@Injectable()
export class EpiService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: EPI): Promise<EPI> {
    return this.prisma.ePI.create({ data });
  }

  async findAll(): Promise<EPI[]> {
    return this.prisma.ePI.findMany();
  }

  async findOne(id: string): Promise<EPI> {
    const epi = await this.prisma.ePI.findUnique({ where: { id } });
    if (!epi) {
      throw new NotFoundException(`EPI with ID "${id}" not found`);
    }
    return epi;
  }

  async update(id: string, data: EPI): Promise<EPI> {
    const epi = await this.findOne(id);
    if (!epi) {
      throw new NotFoundException(`EPI with ID "${id}" not found`);
    }
    return this.prisma.ePI.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<EPI> {
    const epi = await this.findOne(id);
    if (!epi) {
      throw new NotFoundException(`EPI with ID "${id}" not found`);
    }
    return this.prisma.ePI.delete({ where: { id } });
  }
}
