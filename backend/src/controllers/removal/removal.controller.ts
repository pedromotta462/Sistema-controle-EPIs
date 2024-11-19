import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { Prisma, Retirada } from '@prisma/client';
import { RemovalService } from '../../services/removal/removal.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('removal')
export class RemovalController {
  constructor(private readonly retiradaService: RemovalService) {}

  @Post()
  create(@Body() data: Retirada) {
    return this.retiradaService.create(data);
  }

  @Get()
  findAll() {
    return this.retiradaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.retiradaService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.RetiradaUpdateInput) {

    return this.retiradaService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Patch('/approve/:id')
  async approveRemoval(@Param('id') id: string, @Request() req) {
    const user = req.user;

    return this.retiradaService.approveRemoval(user, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.retiradaService.remove(id);
  }
}
