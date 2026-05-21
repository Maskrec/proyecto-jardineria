import { Controller, Post, Get, Body, UseGuards, Param } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { RegisterEmpleadoDto } from './dto/register-empleado.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('personal')
export class PersonalController {
  constructor(private readonly personalService: PersonalService) {}

  /**
   * Registrarse como empleado (sin protección JWT)
   * POST /personal
   */
  @Post()
  async registrarse(@Body() registerEmpleadoDto: RegisterEmpleadoDto) {
    return this.personalService.registrarse(registerEmpleadoDto);
  }

  /**
   * Crear primer admin (onboarding inicial)
   * POST /personal/onboarding/init
   */
  @Post('onboarding/init')
  async onboardingInit(@Body() createPersonalDto: CreatePersonalDto) {
    return this.personalService.onboardingInit(createPersonalDto);
  }

  /**
   * Admin/RH agrega nuevo empleado
   * POST /personal/onboarding
   * Requiere JWT válido de ADMIN o RH
   */
  @Post('onboarding')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.RH)
  onboarding(@Body() createPersonalDto: CreatePersonalDto) {
    return this.personalService.onboarding(createPersonalDto);
  }

  /**
   * Obtener lista de empleados
   * GET /personal
   */
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.RH)
  findAll() {
    return this.personalService.findAll();
  }

  /**
   * Obtener empleado por ID
   * GET /personal/:id_empleado
   */
  @Get(':id_empleado')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id_empleado') id_empleado: string) {
    return this.personalService.findOne(id_empleado);
  }
}