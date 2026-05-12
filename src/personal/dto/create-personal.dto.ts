import { IsEmail, IsNotEmpty, IsString, MinLength, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { Role, Estado_laboral } from '@prisma/client';

export class CreatePersonalDto {
  @IsString()
  @IsNotEmpty()
  id_empleado!: string; // 

  @IsString()
  @IsNotEmpty()
  nombre_completo!: string;

  @IsEmail({}, { message: 'El correo electrónico no es valido' })
  @IsNotEmpty()
  email_corporativo!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsString()
  @IsNotEmpty()
  telefono!: string;

  @IsString()
  @IsNotEmpty()
  cargo!: string;

  @IsString()
  @IsNotEmpty()
  departamento!: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsDateString({}, { message: 'Debe ser una fecha valida (YYYY-MM-DD)' })
  @IsNotEmpty()
  fecha_nacimiento!: string;

  @IsEnum(Estado_laboral)
  @IsOptional()
  estado_laboral?: Estado_laboral;
}