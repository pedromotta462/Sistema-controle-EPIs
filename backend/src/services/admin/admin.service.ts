import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Admin, Prisma } from '@prisma/client';
import * as argon2 from 'argon2';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.AdminCreateInput): Promise<Admin> {
    if (!data.senha) throw new Error('Senha é obrigatório');

    data.senha = await argon2.hash(data.senha);

    return this.prisma.admin.create({ data });
  }

  async findAll(): Promise<Admin[]> {
    return this.prisma.admin.findMany();
  }

  async findOne(
    adminWhereUniqueInput: Prisma.AdminWhereUniqueInput,
  ): Promise<Admin> {
    const admin = await this.prisma.admin.findUnique({
      where: adminWhereUniqueInput,
    });
    if (!admin) {
      throw new NotFoundException(
        `Admin with Input "${adminWhereUniqueInput}" not found`,
      );
    }
    return admin;
  }

  async update(params: {
    where: Prisma.AdminWhereUniqueInput;
    data: Prisma.AdminUpdateInput;
  }): Promise<Admin> {
    const { where, data } = params;

    if (data.senha) {
      const hashedPassword = await argon2.hash(data.senha as string);
      data.senha = { set: hashedPassword };
    }

    return this.prisma.admin.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.AdminWhereUniqueInput): Promise<Admin> {
    const admin = await this.findOne(where);
    if (!admin) {
      throw new NotFoundException(`Admin with Input "${where}" not found`);
    }
    return this.prisma.admin.delete({ where: where });
  }
}
