import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationService } from '../../services/notification/notification.service';
import { Notificacao } from '@prisma/client';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificacaoService: NotificationService) {}

  @Post()
  create(@Body() data: Notificacao) {
    return this.notificacaoService.create(data);
  }

  @Get()
  findAll() {
    return this.notificacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificacaoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Notificacao) {
    return this.notificacaoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificacaoService.remove(id);
  }
}
