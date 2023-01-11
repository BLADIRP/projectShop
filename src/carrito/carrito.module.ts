import { Module } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { CarritoController } from './carrito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrito } from './entities/carrito.entity';
import { Car_Product } from './entities/car_product';
import { CarritoRepository } from './carrito.repository';

@Module({
  controllers: [CarritoController],
  providers: [CarritoService, CarritoRepository],
  imports: [TypeOrmModule.forFeature([Carrito, Car_Product])],
  exports: [CarritoService, TypeOrmModule],
})
export class CarritoModule {}
