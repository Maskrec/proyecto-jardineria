import { Module } from '@nestjs/common';
import { FormacionController } from './formacion.controller';
import { FormacionService } from './formacion.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FormacionController],
  providers: [FormacionService],
})
export class FormacionModule {}
