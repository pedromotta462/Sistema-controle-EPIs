import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Funcionario, Prisma } from '@prisma/client';
import * as argon2 from 'argon2';
import { MailerService } from 'src/controllers/mailer/mailer.service';
import { registerEmployeeTemplate } from 'src/controllers/mailer/constants';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly prisma: PrismaService,
    private sendmailService: MailerService,
  ) {}

  async create(data: Prisma.FuncionarioCreateInput): Promise<Funcionario> {
    if (!data.senha) {
      data.senha = Math.random().toString(36).slice(-8);
    }

    const mailerObj = {
      to: [data.email],
      subject: "Cadastro de Funcionário",
      html: registerEmployeeTemplate(data.senha),
    }

    await this.sendmailService.sendMail(mailerObj);

    data.senha = await argon2.hash(data.senha);

    return await this.prisma.funcionario.create({ data });
  }

  async findAll(): Promise<Funcionario[]> {
    return this.prisma.funcionario.findMany();
  }

  async findOne(
    employeeWhereUniqueInput: Prisma.FuncionarioWhereUniqueInput,
  ): Promise<Funcionario> {
    const funcionario = await this.prisma.funcionario.findUnique({
      where: employeeWhereUniqueInput,
    });

    if (!funcionario) {
      throw new NotFoundException(
        `Funcionario with Input "${JSON.stringify(employeeWhereUniqueInput)}" not found`,
      );
    }
    return funcionario;
  }

  async update(params: {
    where: Prisma.FuncionarioWhereUniqueInput;
    data: Prisma.FuncionarioUpdateInput;
  }): Promise<Funcionario> {
    const { where, data } = params;

    if (data.senha) {
      const hashedPassword = await argon2.hash(data.senha as string);
      data.senha = { set: hashedPassword };
    }

    return this.prisma.funcionario.update({
      data,
      where,
    });
  }

  async remove(
    where: Prisma.FuncionarioWhereUniqueInput,
  ): Promise<Funcionario> {
    const funcionario = await this.findOne(where);

    if (!funcionario) {
      throw new NotFoundException(`Funcionario with Input ${where} not found`);
    }
    return this.prisma.funcionario.delete({ where: where });
  }
}
