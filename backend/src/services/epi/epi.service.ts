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

  async requestOne(user: { sub: string; username: string; email: string; role: string }, id: string): Promise<Retirada> {
    const epi = await this.prisma.ePI.findUnique({ where: { id } });
    if (!epi) throw new NotFoundException(`EPI with ID "${id}" not found`);
    if (epi.quantidadeDisponivel === 0) throw new NotAcceptableException(`EPI with ID "${id}" is out of stock`);
  
    const retiradaData = {
      epiId: id,
      funcionarioId: user.sub,
      dataRetirada: new Date(),
      dataPrevistaDevolucao: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    };
  
    const notificacao = {
      tipo: 'Solicitação',
      mensagem: `Solicitação de EPI ${epi.nome} retirado por ${user.username}`,
      funcionarioId: user.sub,
    };
    this.sendNotificationToUsers(notificacao).catch(console.error); // Handle errors gracefully
  
    return await this.prisma.retirada.create({
      data: retiradaData,
    });
  }
  


  private async sendNotificationToUsers(notificacao: { tipo: string; mensagem: string; funcionarioId: string }) {
    await this.prisma.notificacao.create({
      data: notificacao,
    });
  
    const admins = await this.prisma.admin.findMany();
    const adminNotifications = admins.map((admin) => ({
      tipo: notificacao.tipo,
      mensagem: notificacao.mensagem,
      adminId: admin.id,
    }));
  
    await this.prisma.notificacao.createMany({
      data: adminNotifications,
    });
  
    return 'Notificações enviadas';
  }
  

  async devolutionOne(user: { sub: string; username: string; email: string; role: string }, id: string): Promise<Devolucao> {
    const retirada = await this.prisma.retirada.findFirst({
      where: { id },
      include: { epi: true },
    });
    if (!retirada) throw new NotFoundException(`Retirada with ID "${id}" not found`);
  
    const devolucaoData = {
      retiradaId: retirada.id,
      dataDevolucao: new Date(),
    };
  
    const notificacao = {
      tipo: 'Solicitação',
      mensagem: `Devolução de EPI: ${retirada.epi.nome} devolvido por ${user.username}`,
      funcionarioId: user.sub,
    };
    this.sendNotificationToUsers(notificacao).catch(console.error);
  
    return await this.prisma.devolucao.create({
      data: devolucaoData,
  });
  }
  
}
