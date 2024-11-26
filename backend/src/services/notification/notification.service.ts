import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Notificacao } from '@prisma/client';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Notificacao): Promise<Notificacao> {
    return this.prisma.notificacao.create({ data });
  }

  async findAll(): Promise<Notificacao[]> {
    return this.prisma.notificacao.findMany();
  }

  async findOne(id: string): Promise<Notificacao> {
    const notificacao = await this.prisma.notificacao.findUnique({
      where: { id },
    });
    if (!notificacao) {
      throw new NotFoundException(`Notificacao with ID "${id}" not found`);
    }
    return notificacao;
  }

  async update(id: string, data: Notificacao): Promise<Notificacao> {
    const notification = await this.findOne(id);
    if (!notification) {
      throw new NotFoundException(`Notificacao with ID "${id}" not found`);
    }
    return this.prisma.notificacao.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Notificacao> {
    const notificacao = await this.findOne(id);
    if (!notificacao) {
      throw new NotFoundException(`Notificacao with ID "${id}" not found`);
    }
    return this.prisma.notificacao.delete({ where: { id } });
  }

  async findByUser(user): Promise<Notificacao[]> {
    if(user.role){
      return this.prisma.notificacao.findMany({
        where: {
          funcionarioId: user.sub,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
    }else {
      return this.prisma.notificacao.findMany({
        where: {
          adminId: user.sub,
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });
    }
  }
}
