import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFormacionDto } from './dto/create-formacion.dto';
import { UpdateFormacionDto } from './dto/update-formacion.dto';

@Injectable()
export class FormacionService {
  constructor(private prisma: PrismaService) {}

  async create(createFormacionDto: CreateFormacionDto) {
    return this.prisma.formacion.create({
      data: {
        id_empleado: createFormacionDto.id_empleado,
        nombre_curso: createFormacionDto.nombre_curso,
        progreso: createFormacionDto.progreso ?? 0,
        fecha_expiracion: new Date(createFormacionDto.fecha_expiracion),
        reconocimiento: createFormacionDto.reconocimiento ?? null,
      },
    });
  }

  async update(id_formacion: number, updateFormacionDto: UpdateFormacionDto) {
    const existing = await this.prisma.formacion.findUnique({
      where: { id_formacion },
    });

    if (!existing) {
      throw new NotFoundException('Registro de formacion no encontrado');
    }

    const data: Record<string, any> = {};
    if (updateFormacionDto.nombre_curso !== undefined) {
      data.nombre_curso = updateFormacionDto.nombre_curso;
    }
    if (updateFormacionDto.progreso !== undefined) {
      data.progreso = updateFormacionDto.progreso;
    }
    if (updateFormacionDto.fecha_expiracion !== undefined) {
      data.fecha_expiracion = new Date(updateFormacionDto.fecha_expiracion);
    }
    if (updateFormacionDto.reconocimiento !== undefined) {
      data.reconocimiento = updateFormacionDto.reconocimiento;
    }

    return this.prisma.formacion.update({
      where: { id_formacion },
      data,
    });
  }

  async findAll(id_empleado?: string) {
    const query: any = { orderBy: { fecha_expiracion: 'desc' } };
    if (id_empleado) {
      query.where = { id_empleado };
    }
    return this.prisma.formacion.findMany(query);
  }
}
