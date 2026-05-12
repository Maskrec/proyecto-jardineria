import {IsEmail, IsNotEmpty, MinLength} from 'class-validator';

export class LoginDto {
    @IsEmail ({}, {message: 'El correo electronico no es valido'})
    @IsNotEmpty ({message: 'El correo electronico es obligatorio'})
    email_corporativo!: string;

    @IsNotEmpty ({message: 'La contraseña no puede estar vacia'})
    @MinLength (6, {message: 'La contraseña debe tener al menos 6 caracteres'})
    password!: string;
}