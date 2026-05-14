import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAsistenciaDto } from './dto/create-asistencia.dto';
import { UpdateAsistenciaDto } from './dto/update-asistencia.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AsistenciaService {
  constructor(private prisma: PrismaService) {}

  async create(createAsistenciaDto: CreateAsistenciaDto) {
    const data: Prisma.Asistencia_nominaUncheckedCreateInput = {
      id_empleado: createAsistenciaDto.id_empleado,
      hora_entrada: new Date(createAsistenciaDto.hora_entrada),
      hora_salida: createAsistenciaDto.hora_salida
        ? new Date(createAsistenciaDto.hora_salida)
        : null,
      ganancias_dia: createAsistenciaDto.ganancias_dia ?? 0,
      bonos_activos: createAsistenciaDto.bonos_activos ?? 0,
    };

    return this.prisma.asistencia_nomina.create({ data });
  }

  async update(id_registro: number, updateAsistenciaDto: UpdateAsistenciaDto) {
    const existing = await this.prisma.asistencia_nomina.findUnique({
      where: { id_registro },
    });

    if (!existing) {
      throw new NotFoundException('Registro de asistencia no encontrado');
    }

    const data: Prisma.Asistencia_nominaUncheckedUpdateInput = {};
    if (updateAsistenciaDto.hora_entrada) {
      data.hora_entrada = new Date(updateAsistenciaDto.hora_entrada);
    }
    if (updateAsistenciaDto.hora_salida) {
      data.hora_salida = new Date(updateAsistenciaDto.hora_salida);
    }
    if (updateAsistenciaDto.ganancias_dia !== undefined) {
      data.ganancias_dia = updateAsistenciaDto.ganancias_dia;
    }
    if (updateAsistenciaDto.bonos_activos !== undefined) {
      data.bonos_activos = updateAsistenciaDto.bonos_activos;
    }

    return this.prisma.asistencia_nomina.update({
      where: { id_registro },
      data,
    });
  }

  async findAll(id_empleado?: string) {
    const query: Prisma.Asistencia_nominaFindManyArgs = { orderBy: { hora_entrada: 'desc' } };
    if (id_empleado) {
      query.where = { id_empleado };
    }
    return this.prisma.asistencia_nomina.findMany(query);
  }
}
