import {IsEmail, IsNotEmpty, MinLength} from 'class-validator';

export class LoginDto {
    @IsEmail ({}, {message: 'El correo electrónico no es válido'})
    @IsNotEmpty ({message: 'El correo electrónico es obligatorio'})
    email_corporativo: string;

    @IsNotEmpty ({message: 'La contraseña no puede estar vacía'})
    @MinLength (6, {message: 'La contraseña debe tener al menos 6 caracteres'})
    password: string;
}
