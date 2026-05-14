import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAsistenciaDto {
  @ApiProperty({ description: 'Hora de entrada en formato ISO', example: '2026-05-07T08:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  hora_entrada?: string;

  @ApiProperty({ description: 'Hora de salida en formato ISO', example: '2026-05-07T17:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  hora_salida?: string;

  @ApiProperty({ description: 'Ganancias del día', example: 120.5, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  ganancias_dia?: number;

  @ApiProperty({ description: 'Bonos activos del día', example: 25.0, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  bonos_activos?: number;
}
