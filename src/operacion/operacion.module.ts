import { Module } from '@nestjs/common';
import { OperacionService } from './operacion.service';
import { OperacionController } from './operacion.controller';
import { Operacion } from './entities/operacion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperacionRepository } from './operacion.repository';

@Module({
  controllers: [OperacionController],
  providers: [OperacionService, OperacionRepository],
  imports: [TypeOrmModule.forFeature([Operacion])],
  exports: [OperacionService, TypeOrmModule],
})
export class OperacionModule {}
