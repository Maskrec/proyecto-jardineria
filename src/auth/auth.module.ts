import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from '../prisma/prisma.module'; // Importante para usar la BD

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true, // Permite usar el JWT en otros módulos sin volver a importarlo
      secret: process.env.JWT_SECRET || 'super-secreto-brightview-2026-XD', // Clave temporal
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}