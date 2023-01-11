import { Module } from '@nestjs/common';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { Venta } from './entities/venta.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentaRepository } from './venta.repository';

@Module({
  controllers: [VentaController],
  providers: [VentaService, VentaRepository],
  imports: [TypeOrmModule.forFeature([Venta])],
  exports: [VentaService, TypeOrmModule],
})
export class VentaModule {}
