import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';

@Injectable()
export class PermisosService {
  constructor(private prisma: PrismaService) {}

  async create(createPermisoDto: CreatePermisoDto) {
    return this.prisma.permisos.create({
      data: {
        id_empleado: createPermisoDto.id_empleado,
        tipo_permiso: createPermisoDto.tipo_permiso,
        fecha_inicio: new Date(createPermisoDto.fecha_inicio),
        fecha_fin: new Date(createPermisoDto.fecha_fin),
      },
    });
  }

  async updateEstado(id_solicitud: number, updatePermisoDto: UpdatePermisoDto) {
    const existing = await this.prisma.permisos.findUnique({
      where: { id_solicitud },
    });

    if (!existing) {
      throw new NotFoundException('Solicitud de permiso no encontrada');
    }

    return this.prisma.permisos.update({
      where: { id_solicitud },
      data: {
        estado: updatePermisoDto.estado,
      },
    });
  }

  async findAll(id_empleado?: string) {
    const query: any = { orderBy: { fecha_inicio: 'desc' } };
    if (id_empleado) {
      query.where = { id_empleado };
    }
    return this.prisma.permisos.findMany(query);
  }
}
