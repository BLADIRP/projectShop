import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Car_Product } from './entities/car_product';
import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { AddProductDto } from './dto/create-car_product.dto';
import { isUUID } from 'class-validator';
import { UpdateAddProductDto } from './dto/update-car_product.dto';

@EntityRepository(Car_Product)
export class CarProductRepository extends Repository<Car_Product> {
  private logger = new Logger('ProductCarritoRepository');

  getCarProductRepository() {
    return getRepository(Car_Product);
  }

  async addProduct(addProductDto: AddProductDto): Promise<Car_Product> {
    try {
      console.log(`estoy aqui bladi`);
      console.log(addProductDto);
      addProductDto = { fkCar: 'A', fkProduct: 'B', cantidad: 1 };
      console.log(addProductDto);
      const product = this.getCarProductRepository().create(addProductDto);
      console.log(product);
      await this.getCarProductRepository().save(product);
      return product;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findCarrito(id: string): Promise<Car_Product> {
    let carrito: Car_Product;
    if (isUUID(id))
      carrito = await this.getCarProductRepository().findOne({ id: id });
    if (!carrito) throw new NotFoundException(`id : ${id} not found`);
    return carrito;
  }

  async updateProduct(
    id: string,
    updateAddProductDto: UpdateAddProductDto,
  ): Promise<Car_Product> {
    const updateProduct = await this.getCarProductRepository().preload({
      id: id,
      ...updateAddProductDto,
    });
    if (!updateProduct)
      throw new NotFoundException(`Product when id: ${id} not found `);
    await this.getCarProductRepository().save(updateProduct);
    try {
      return updateProduct;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async removeProduct(id: string): Promise<Car_Product> {
    const product = await this.findCarrito(id);
    this.getCarProductRepository().remove(product);
    return product;
  }

  handleDBExceptions(error: any) {
    if (error.code == '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }

  async findProduct(id: string): Promise<Array<Car_Product>> {
    let product: Car_Product[];
    if (isUUID(id))
      product = await this.getCarProductRepository().find({
        where: { carrito: id },
      });
    if (!product) throw new NotFoundException(`id : ${id} not found`);
    return product;
  }
}
