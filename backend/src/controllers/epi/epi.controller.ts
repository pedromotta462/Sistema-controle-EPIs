import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EpiService } from '../../services/epi/epi.service';
import { EPI } from '@prisma/client';

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: EPI) {
    return this.epiService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.epiService.remove(id);
  }
}
