import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Retirada } from '@prisma/client';

@Injectable()
export class RemovalService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Retirada): Promise<Retirada> {
    return this.prisma.retirada.create({ data });
  }

  async findAll(): Promise<Retirada[]> {
    return this.prisma.retirada.findMany(
      {
        include: {
          funcionario: true,
          epi: true,
          adminAprovacao: true,
          devolucao: true,
        },
      }
    );
  }

  async findOne(id: string): Promise<Retirada> {
    const retirada = await this.prisma.retirada.findUnique({ 
      where: { id }, 
      include: {
        funcionario: true,
        epi: true,
        adminAprovacao: true,
        devolucao: true,
      },
    });
    if (!retirada) {
      throw new NotFoundException(`Retirada with ID "${id}" not found`);
    }
    return retirada;
  }

  async update(id: string, data?: Prisma.RetiradaUpdateInput): Promise<Retirada> {
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

  async approveRemoval(user: {sub: string, username: string, email: string }, id: string): Promise<Retirada> {

    const retirada = await this.prisma.retirada.findUnique({ 
      where: { id }, 
      include: {
        epi: true,
      },
    });

    if (!retirada) {
      throw new NotFoundException(`Retirada with ID "${id}" not found`);
    }

    if (retirada.epi.quantidadeDisponivel === 0) {
      throw new NotAcceptableException(`EPI com ID "${retirada.epiId}" está sem stock`);
    }

    await this.prisma.ePI.update({
      where: { id: retirada.epiId },
      data: {
        quantidadeDisponivel: { decrement: 1 },
      },
    });

    const notificacao = {
      tipo: "Retirada",
      mensagem: `A retirada do EPI ${retirada.epi.nome} foi aprovada`,
      funcionarioId: retirada.funcionarioId,
    }

    await this.sendNotificationToUser(notificacao);

    return await this.prisma.retirada.update({
      where: { id },
      data: {
        adminAprovacao: {
          connect: { id: user.sub },
        },
      },
    });
  }

  private async sendNotificationToUser(notificacao: { tipo: string; mensagem: string; funcionarioId: string; }) {
    return await this.prisma.notificacao.create({
      data: notificacao,
    });
  }
}
