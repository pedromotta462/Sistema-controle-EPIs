import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminService } from '../../services/admin/admin.service';
import { Admin, Prisma } from '@prisma/client';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() data: Admin) {
    return this.adminService.create(data);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') where: Prisma.AdminWhereUniqueInput) {
    return this.adminService.findOne(where);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: Prisma.AdminUpdateInput,
  ) {
    const where: Prisma.AdminWhereUniqueInput = { id };

    return this.adminService.update({ where, data });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const where: Prisma.AdminWhereUniqueInput = { id };
    
    return this.adminService.remove(where);
  }
}
