import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PersonalModule } from './personal/personal.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { PermisosModule } from './permisos/permisos.module';
import { FormacionModule } from './formacion/formacion.module';
import { NominaModule } from './nomina/nomina.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    PersonalModule,
    AsistenciaModule,
    PermisosModule,
    FormacionModule,
    NominaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}