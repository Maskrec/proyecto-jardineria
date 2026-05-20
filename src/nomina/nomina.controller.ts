import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { NominaService } from './nomina.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('nomina')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NominaController {
  constructor(private readonly nominaService: NominaService) {}

  @Get()
  @Roles(Role.ADMIN, Role.RH)
  findAll() {
    return this.nominaService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.RH, Role.EMPLEADO)
  findOne(@Param('id') id: string) {
    return this.nominaService.findOne(id);
  }
}
