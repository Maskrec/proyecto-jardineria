import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Tipo_permiso } from '@prisma/client';

export class CreatePermisoDto {
  @ApiProperty({ description: 'ID de empleado que solicita el permiso', example: '003-BV' })
  @IsString()
  @IsNotEmpty()
  id_empleado!: string;

  @ApiProperty({ description: 'Tipo de permiso solicitado', enum: Tipo_permiso })
  @IsEnum(Tipo_permiso)
  tipo_permiso!: Tipo_permiso;

  @ApiProperty({ description: 'Fecha de inicio del permiso', example: '2026-05-08T09:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  fecha_inicio!: string;

  @ApiProperty({ description: 'Fecha de fin del permiso', example: '2026-05-10T18:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  fecha_fin!: string;
}
