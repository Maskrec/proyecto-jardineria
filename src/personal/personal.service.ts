import { Injectable, ConflictException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { RegisterEmpleadoDto } from './dto/register-empleado.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class PersonalService {
  constructor(private prisma: PrismaService) {}

  /**
   * Generar ID único de empleado: EMP-YYYY-XXXXX
   */
  private async generateEmpleadoId(): Promise<string> {
    const year = new Date().getFullYear();
    const count = await this.prisma.personal.count({
      where: {
        id_empleado: {
          startsWith: `EMP-${year}`,
        },
      },
    });
    const sequence = String(count + 1).padStart(5, '0');
    return `EMP-${year}-${sequence}`;
  }

  private async createEmployee(createPersonalDto: CreatePersonalDto) {
    const { password, fecha_nacimiento, ...rest } = createPersonalDto;

    // Generar id_empleado si no se proporciona
    let id_empleado = rest.id_empleado;
    if (!id_empleado) {
      id_empleado = await this.generateEmpleadoId();
    }

    const existeEmail = await this.prisma.personal.findUnique({
      where: { email_corporativo: rest.email_corporativo },
    });
    if (existeEmail) throw new ConflictException('El correo ya esta registrado');

    const existeId = await this.prisma.personal.findUnique({
      where: { id_empleado },
    });
    if (existeId) throw new ConflictException('El ID de empleado ya existe');

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoEmpleado = await this.prisma.personal.create({
      data: {
        ...rest,
        id_empleado,
        password: hashedPassword,
        ...(fecha_nacimiento && { fecha_nacimiento: new Date(fecha_nacimiento) }),
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

  /**
   * Auto-registro de empleado (sin protección JWT)
   * Genera id_empleado automáticamente
   */
  async registrarse(registerEmpleadoDto: RegisterEmpleadoDto) {
    const { password, fecha_nacimiento, ...rest } = registerEmpleadoDto;

    // Verificar que email no exista
    const existeEmail = await this.prisma.personal.findUnique({
      where: { email_corporativo: rest.email_corporativo },
    });
    if (existeEmail) {
      throw new ConflictException('El correo ya está registrado');
    }

    // Generar id_empleado automáticamente
    const id_empleado = await this.generateEmpleadoId();

    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoEmpleado = await this.prisma.personal.create({
      data: {
        id_empleado,
        ...rest,
        password: hashedPassword,
        ...(fecha_nacimiento && { fecha_nacimiento: new Date(fecha_nacimiento) }),
        role: Role.EMPLEADO,
        estado_laboral: 'onboarding',
      },
    });

    const { password: _, ...empleadoSinPassword } = nuevoEmpleado;
    return empleadoSinPassword;
  }

  async findAll() {
    return this.prisma.personal.findMany({
      select: {
        id_empleado: true,
        nombre_completo: true,
        email_corporativo: true,
        role: true,
        telefono: true,
        cargo: true,
        departamento: true,
        direccion: true,
        fecha_nacimiento: true,
        estado_laboral: true,
      },
    });
  }

  async findOne(id_empleado: string) {
    const empleado = await this.prisma.personal.findUnique({
      where: { id_empleado },
      select: {
        id: true,
        id_empleado: true,
        nombre_completo: true,
        email_corporativo: true,
        role: true,
        telefono: true,
        cargo: true,
        departamento: true,
        direccion: true,
        fecha_nacimiento: true,
        estado_laboral: true,
        fecha_creacion: true,
        fecha_actualizacion: true,
      },
    });

    if (!empleado) {
      throw new NotFoundException(`Empleado con ID ${id_empleado} no encontrado`);
    }

    return empleado;
  }
}