import { Body, Controller, Post, HttpCode, HttpStatus, Request, UseGuards, Get, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminService } from '../../services/admin/admin.service';
import { EmployeeService } from '../../services/employee/employee.service';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private adminService: AdminService,
        private employeeService: EmployeeService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login/admin')
    signInAdmin(@Body() signInDto: Record<string, any>) {
        return this.authService.signInAdmin(signInDto.email, signInDto.password, signInDto.recaptchaToken);
    }

    @HttpCode(HttpStatus.OK)
    @Post('login/employee')
    signInEmployee(@Body() signInDto: Record<string, any>) {
        return this.authService.signInEmployee(signInDto.email, signInDto.password, signInDto.recaptchaToken);
    }

    //SignUp
    @HttpCode(HttpStatus.CREATED)
    @Post('signup/admin')
    signUpAdmin(@Body() signUpAdminDto: Prisma.AdminCreateInput) {
        return this.adminService.create(signUpAdminDto);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup/employee')
    signUp(@Body() signUpEmployeeDto: Prisma.FuncionarioCreateInput) {
        return this.employeeService.create(signUpEmployeeDto);
    }
}
