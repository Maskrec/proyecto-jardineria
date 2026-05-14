import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ){}

    async login(loginDto: LoginDto) {
        const { email_corporativo, password } = loginDto;

        const empleado = await this.prisma.personal.findUnique({
            where: { email_corporativo},
        });

        if (!empleado) {
            throw new UnauthorizedException('Credenciales invalidas');
        }

        const isPasswordValid = await bcrypt.compare(password, empleado.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales invalidas');
        }

        const payload = { sub: empleado.id_empleado, role: empleado.role };

        return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
                id: empleado.id_empleado,
                nombre: empleado.nombre_completo,
                role: empleado.role,
            },

        };
    }

}