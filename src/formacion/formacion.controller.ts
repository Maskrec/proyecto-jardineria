import { Controller, Get, Post, Body, Patch, Param, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FormacionService } from './formacion.service';
import { CreateFormacionDto } from './dto/create-formacion.dto';
import { UpdateFormacionDto } from './dto/update-formacion.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Formación')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('formacion')
export class FormacionController {
  constructor(private readonly formacionService: FormacionService) {}

  @ApiOperation({ summary: 'Registrar una nueva formacion o capacitacion' })
  @Post()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.RH)
  create(@Body() createFormacionDto: CreateFormacionDto) {
    return this.formacionService.create(createFormacionDto);
  }

  @ApiOperation({ summary: 'Actualizar un registro de formacion' })
  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.RH)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFormacionDto: UpdateFormacionDto,
  ) {
    return this.formacionService.update(id, updateFormacionDto);
  }

  @ApiOperation({ summary: 'Listar formaciones, opcionalmente filtradas por empleado' })
  @Get()
  findAll(@Query('id_empleado') id_empleado?: string) {
    return this.formacionService.findAll(id_empleado);
  }
}
