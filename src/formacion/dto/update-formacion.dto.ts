import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateFormacionDto {
  @ApiProperty({ description: 'Nombre del curso o capacitacion', example: 'Diseño Biofilico Avanzado', required: false })
  @IsOptional()
  @IsString()
  nombre_curso?: string;

  @ApiProperty({ description: 'Progreso del curso en porcentaje', example: 75, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  progreso?: number;

  @ApiProperty({ description: 'Fecha de expiracion de la capacitacion', example: '2027-05-07T00:00:00Z', required: false })
  @IsOptional()
  @IsDateString()
  fecha_expiracion?: string;

  @ApiProperty({ description: 'reconocimiento o merito asociado', example: 'top 5% Company talent', required: false })
  @IsOptional()
  @IsString()
  reconocimiento?: string;
}
