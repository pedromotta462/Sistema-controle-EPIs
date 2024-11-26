import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { NotificationService } from '../../services/notification/notification.service';
import { Notificacao } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Notificacao) {
    return this.notificacaoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificacaoService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Get('/by-user')
  findByUser(
    @Request() req,
  ) {
    const user = req.user;

    return this.notificacaoService.findByUser(user);
  }
}
