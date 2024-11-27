import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../../services/admin/admin.service';
import { EmployeeService } from '../../services/employee/employee.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Admin, Funcionario } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
    
    constructor(
        private adminService: AdminService,
        private employeeService: EmployeeService,
        private jwtService: JwtService,
        private httpService: HttpService
    ) {}

    async signInEmployee(email: string, pass: string, recaptchaToken: string): Promise<{ access_token: string, user: Funcionario }> {

        await this.validateRecaptcha(recaptchaToken);


        const user = await this.employeeService.findOne({ email });

        if (!user || !(await argon2.verify(user.senha, pass))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        
        const payload = { sub: user.id, username: user.nome, email: user.email , role: user.cargo };

        delete user.senha;

        return {
            access_token: await this.jwtService.signAsync(payload),
            user: user,
        };

    }

    async signInAdmin(email: string, pass: string, recaptchaToken: string): Promise<{ access_token: string, user: Admin }> {

        await this.validateRecaptcha(recaptchaToken);

        const admin = await this.adminService.findOne({ email });

        if (!admin || !(await argon2.verify(admin.senha, pass))) {
            throw new UnauthorizedException('Invalid credentials');
        }
        
        const payload = { sub: admin.id, username: admin.nome };

        delete admin.senha;

        return {
            access_token: await this.jwtService.signAsync(payload),
            user: admin,
        };

    }

    private async validateRecaptcha(token: string): Promise<void> {
        const url = `https://www.google.com/recaptcha/api/siteverify`;
        const response = await lastValueFrom(
            this.httpService.post(url, null, {
                params: {
                    secret: process.env.RECAPTCHA_SECRET_KEY,
                    response: token,
                },
            }),
        );

        if (!response.data.success) {
            console.log(response.data);
            throw new BadRequestException('Falha na validação do reCAPTCHA.');
        }
    }

}
