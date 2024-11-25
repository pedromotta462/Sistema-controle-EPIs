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
    return this.prisma.devolucao.findMany(
      {
        include: {
          retirada: {
            include: {
              funcionario: true,
              epi: true,
            },
          },
          adminAprovacao: true,
        },
      }
    );
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

  async approveDevolution(user: {sub: string, username: string, email: string }, id: string): Promise<Devolucao> {
    
    const updatedDevolucao = await this.prisma.devolucao.update({
      where: { id },
      data: {
        adminAprovacao: {
          connect: { id: user.sub },
        },
      },
      include: {
        retirada: {
          include: {
            epi: true,
          },
        },
      },
    });

    const epi = await this.prisma.ePI.update({
      where: { id: updatedDevolucao.retirada.epi.id },
      data: {
        quantidadeDisponivel: {
          increment: 1,
        },
      },
    });

    const notificacao = {
      tipo: "Devolução",
      mensagem: `A devolução do EPI ${updatedDevolucao.retirada.epi.nome} foi aprovada.`,
      funcionarioId: updatedDevolucao.retirada.funcionarioId,
    };

    await this.sendNotificationToUser(notificacao);

    return updatedDevolucao;
  }

  private async sendNotificationToUser(notificacao: { tipo: string; mensagem: string; funcionarioId: string; }) {
    return await this.prisma.notificacao.create({
      data: notificacao,
    });
  }
}
