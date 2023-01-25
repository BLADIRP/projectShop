import { Module } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { CarritoController } from './carrito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/carrito.entity';
import { Cart_Product } from './entities/car_product';
import { CarritoRepository } from './carrito.repository';
import { CarProductRepository } from './carrito_product.repository';

@Module({
  controllers: [CarritoController],
  providers: [CarritoService, CarritoRepository, CarProductRepository],
  imports: [TypeOrmModule.forFeature([Cart, Cart_Product])],
  exports: [CarritoService, TypeOrmModule],
})
export class CarritoModule {}
