import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { EpiService } from '../../services/epi/epi.service';
import { EPI } from '@prisma/client';
import { AuthGuard } from '../auth/auth.guard';

@Controller('epi')
export class EpiController {
  constructor(private readonly epiService: EpiService) {}

  @Post()
  create(@Body() data: EPI) {
    return this.epiService.create(data);
  }

  @Get()
  findAll() {
    return this.epiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.epiService.findOne(id);
  }

  //solicita um epi
  @UseGuards(AuthGuard)
  @Get('/request/:id')
  requestOne(@Request() req, @Param('id') id: string) {
    const user = req.user;

    return this.epiService.requestOne(user, id);
  }

  //devolve um epi
  @UseGuards(AuthGuard)
  @Get('/devolution/:id')
  devolutionOne(@Request() req, @Param('id') id: string) {
    const user = req.user;

    return this.epiService.devolutionOne(user, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: EPI) {
    return this.epiService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.epiService.remove(id);
  }
}
