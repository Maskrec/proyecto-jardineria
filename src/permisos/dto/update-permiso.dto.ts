import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Estado_solicitud } from '@prisma/client';

export class UpdatePermisoDto {
  @ApiProperty({ description: 'Nuevo estado de la solicitud', enum: Estado_solicitud })
  @IsEnum(Estado_solicitud)
  @IsNotEmpty()
  estado!: Estado_solicitud;
}
