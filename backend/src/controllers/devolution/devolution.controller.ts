import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Devolucao } from '@prisma/client';
import { DevolutionService } from '../../services/devolution/devolution.service';
import { AuthGuard } from '../auth/auth.guard';

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

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Devolucao) {
    return this.devolucaoService.update(id, data);
  }

  @UseGuards(AuthGuard)
  @Patch('/approve/:id')
  async approveRemoval(@Param('id') id: string, @Request() req) {
    const user = req.user;

    return this.devolucaoService.approveDevolution(user, id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.devolucaoService.remove(id);
  }
}
