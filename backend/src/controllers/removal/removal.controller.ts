import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Retirada } from '@prisma/client';
import { RemovalService } from '../../services/removal/removal.service';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Retirada) {
    return this.retiradaService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.retiradaService.remove(id);
  }
}
