import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
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
        throw new NotAcceptableException(`EPI with ID "${id}" is out of stock`);
      }

      const retirada = {
        epiId: id,
        funcionarioId: user.sub, 
        dataRetirada: new Date(),
        dataPrevistaDevolucao: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias de agora
      }

      const notificacao = {
        tipo: 'Solicitação',
        mensagem: `Solicitação de EPI ${epi.nome} retirado por ${user.username}`,
        funcionarioId: user.sub,
      }

      await this.sendNotificationToUsers(notificacao);

      return await this.prisma.retirada.create({
        data: retirada, 
      });

    });
  }


  private async sendNotificationToUsers(notificacao: { tipo: string; mensagem: string; funcionarioId: string; }) {
    
    await this.prisma.notificacao.create({
      data: notificacao,
    });

    delete notificacao.funcionarioId;

    const admins = this.prisma.admin.findMany();

    admins.then((admins) => {
      admins.forEach((admin) => {
        this.prisma.notificacao.create({
          data: {
            tipo: notificacao.tipo,
            mensagem: notificacao.mensagem,
            admin: { connect: { id: admin.id } },
          },
        });
      });
    });

    return "Notificações enviadas";
  }

  async devolutionOne(user: {sub: string, username: string, email: string , role: string}, id: string): Promise<Devolucao> {
    return this.prisma.$transaction(async (prisma) => {

      const retirada = await prisma.retirada.findFirst({
        where: {
          id: id,
        },
        include: {
          epi: true,
        },
      });

      if (!retirada) {
        throw new Error(`Retirada with ID "${id}" not found`);
      }

      const devolucao = {
        retiradaId: retirada.id,
        dataDevolucao: new Date(),
      };

      const notificacao = {
        tipo: 'Devolução',
        mensagem: `Devolução de EPI: ${retirada.epi.nome} devolvido por ${user.username}`,
        funcionarioId: user.sub,
      };

      await this.sendNotificationToUsers(notificacao);

      return await this.prisma.devolucao.create({
        data: devolucao,
      });

    });
  }
}
