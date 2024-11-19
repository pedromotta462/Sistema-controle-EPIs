import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Devolucao, EPI, Funcionario, Retirada } from '@prisma/client';


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

  async requestOne(user: {sub: string, username: string, email: string , role: string}, id: string): Promise<Retirada> {
    return this.prisma.$transaction(async (prisma) => {

      const epi = await prisma.ePI.findUnique({ where: { id } });

      if (!epi) {
        throw new NotFoundException(`EPI with ID "${id}" not found`);
      }

      if (epi.quantidadeDisponivel === 0) {
        throw new Error(`EPI with ID "${id}" is out of stock`);
      }

      const retirada = {
        epiId: id,
        funcionarioId: user.sub, // Replace with actual user ID
        dataRetirada: new Date(),
        dataPrevistaDevolucao: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      }

      await this.prisma.ePI.update({
        where: { id },
        data: {
          quantidadeDisponivel: epi.quantidadeDisponivel - 1,
        },
      });

      return await this.prisma.retirada.create({
        data: retirada, 
      });

    });
  }

  async devolutionOne(user: {sub: string, username: string, email: string , role: string}, id: string): Promise<Devolucao> {
    return this.prisma.$transaction(async (prisma) => {

      const retirada = await prisma.retirada.findFirst({
        where: {
          id: id,
        },
      });

      if (!retirada) {
        throw new Error(`Retirada with ID "${id}" not found`);
      }

      const devolucao = {
        retiradaId: retirada.id,
        dataDevolucao: new Date(),
      };

      await this.prisma.ePI.update({
        where: { id: retirada.epiId },
        data: {
          quantidadeDisponivel: {
            increment: 1,
          },
        },
      });

      return await this.prisma.devolucao.create({
        data: devolucao,
      });

    });
  }
}
