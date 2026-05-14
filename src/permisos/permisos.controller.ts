import { Controller, Get, Post, Body, Patch, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PermisosService } from './permisos.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Permisos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('permisos')
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) {}

  @ApiOperation({ summary: 'Crear solicitud de permiso' })
  @Post()
  create(@Body() createPermisoDto: CreatePermisoDto) {
    return this.permisosService.create(createPermisoDto);
  }

  @ApiOperation({ summary: 'Actualizar estado de una solicitud de permiso' })
  @Patch(':id/estado')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.RH)
  updateEstado(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePermisoDto: UpdatePermisoDto,
  ) {
    return this.permisosService.updateEstado(id, updatePermisoDto);
  }

  @ApiOperation({ summary: 'Listar solicitudes de permiso' })
  @Get()
  findAll(@Query('id_empleado') id_empleado?: string) {
    return this.permisosService.findAll(id_empleado);
  }
}
