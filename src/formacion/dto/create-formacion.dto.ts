import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFormacionDto {
  @ApiProperty({ description: 'ID de empleado al que se asigna la capacitación', example: '003-BV' })
  @IsString()
  @IsNotEmpty()
  id_empleado!: string;

  @ApiProperty({ description: 'Nombre del curso o capacitacion', example: 'Diseño exteriores' })
  @IsString()
  @IsNotEmpty()
  nombre_curso!: string;

  @ApiProperty({ description: 'Progreso del curso en porcentaje', example: 0, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  progreso?: number;

  @ApiProperty({ description: 'Fecha de expiración de la capacitacion', example: '2027-05-07T00:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  fecha_expiracion!: string;

  @ApiProperty({ description: 'Reconocimiento o merito asociado', example: 'Top 5% Company Talent', required: false })
  @IsOptional()
  @IsString()
  reconocimiento?: string;
}
