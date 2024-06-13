import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Devolucao } from '@prisma/client';
import { DevolutionService } from '../../services/devolution/devolution.service';

@Controller('devolution')
export class DevolutionController {
  constructor(private readonly devolucaoService: DevolutionService) {}

  @Post()
  create(@Body() data: Devolucao) {
    return this.devolucaoService.create(data);
  }

  @Get()
  findAll() {
    return this.devolucaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devolucaoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Devolucao) {
    return this.devolucaoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devolucaoService.remove(id);
  }
}
