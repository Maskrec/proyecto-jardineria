import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('personal')
export class PersonalController {
  constructor(private readonly personalService: PersonalService) {}

  @Post('onboarding/init')
  async onboardingInit(@Body() createPersonalDto: CreatePersonalDto) {
    return this.personalService.onboardingInit(createPersonalDto);
  }

  @Post('onboarding')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.RH)
  onboarding(@Body() createPersonalDto: CreatePersonalDto) {
    return this.personalService.onboarding(createPersonalDto);
  }
}