import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Admin } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Admin): Promise<Admin> {
    return this.prisma.admin.create({ data });
  }

  async findAll(): Promise<Admin[]> {
    return this.prisma.admin.findMany();
  }

  async findOne(id: string): Promise<Admin> {
    const admin = await this.prisma.admin.findUnique({ where: { id } });
    if (!admin) {
      throw new NotFoundException(`Admin with ID "${id}" not found`);
    }
    return admin;
  }

  async update(id: string, data: Admin): Promise<Admin> {
    const admin = await this.findOne(id);
    if(!admin){
        throw new NotFoundException(`Admin with ID "${id}" not found`);
    }
    return this.prisma.admin.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Admin> {
    const admin = await this.findOne(id);
    if(!admin){
        throw new NotFoundException(`Admin with ID "${id}" not found`);
    }
    return this.prisma.admin.delete({ where: { id } });
  }
}
