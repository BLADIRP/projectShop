import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductRepository],
  imports: [TypeOrmModule.forFeature([Product])],
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
