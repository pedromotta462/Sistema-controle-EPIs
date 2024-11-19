import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from 'src/services/admin/admin.service';
import { EmployeeService } from 'src/services/employee/employee.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Admin, Funcionario } from '@prisma/client';

@Injectable()
export class AuthService {
    
    constructor(
        private adminService: AdminService,
        private employeeService: EmployeeService,
        private jwtService: JwtService
    ) {}

    async signInEmployee(email: string, pass: string): Promise<{ access_token: string, user: Funcionario }> {

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

    async signInAdmin(email: string, pass: string): Promise<{ access_token: string, user: Admin }> {

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

}
