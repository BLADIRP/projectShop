import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CarritoModule } from './carrito/carrito.module';
import { OperacionModule } from './operacion/operacion.module';
import { VentaModule } from './venta/venta.module';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { ProductRepository } from './products/product.repository';
import { Respuesta } from './common/respuesta';
import { CarritoRepository } from './carrito/carrito.repository';
import { CarProductRepository } from './carrito/carrito_product.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true, //usualmente no se usa en produccion
    }),
    ProductsModule,
    CarritoModule,
    OperacionModule,
    VentaModule,
  ],
  controllers: [ShopController],
  providers: [
    ShopService,
    ProductRepository,
    Respuesta,
    CarritoRepository,
    CarProductRepository,
  ],
})
export class AppModule {}
