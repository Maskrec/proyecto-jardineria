import { Injectable, ConflictException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class PersonalService {
  constructor(private prisma: PrismaService) {}

  private async createEmployee(createPersonalDto: CreatePersonalDto) {
    const { password, fecha_nacimiento, ...rest } = createPersonalDto;

    const existeEmail = await this.prisma.personal.findUnique({
      where: { email_corporativo: rest.email_corporativo },
    });
    if (existeEmail) throw new ConflictException('El correo ya esta registrado');

    const existeId = await this.prisma.personal.findUnique({
      where: { id_empleado: rest.id_empleado },
    });
    if (existeId) throw new ConflictException('El ID de empleado ya existe');

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoEmpleado = await this.prisma.personal.create({
      data: {
        ...rest,
        password: hashedPassword,
        fecha_nacimiento: new Date(fecha_nacimiento),
        estado_laboral: 'onboarding',
      },
    });

    const { password: _, ...empleadoSinPassword } = nuevoEmpleado;
    return empleadoSinPassword;
  }

  async onboarding(createPersonalDto: CreatePersonalDto) {
    return this.createEmployee(createPersonalDto);
  }

  async onboardingInit(createPersonalDto: CreatePersonalDto) {
    const empleadosRegistrados = await this.prisma.personal.count();
    if (empleadosRegistrados > 0) {
      throw new ForbiddenException(
        'La aplicacion ya fue inicializada. Usa el endpoint /personal/onboarding con un usuario ADMIN o RH.',
      );
    }

    if (!createPersonalDto.role) {
      createPersonalDto.role = Role.ADMIN;
    }

    return this.createEmployee(createPersonalDto);
  }
}