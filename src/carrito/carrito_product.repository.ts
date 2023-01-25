import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Cart_Product } from './entities/car_product';
import { BadRequestException, Logger, NotFoundException } from '@nestjs/common';
import { AddProductDto } from './dto/create-car_product.dto';
import { isUUID } from 'class-validator';
import { UpdateAddProductDto } from './dto/update-car_product.dto';
import { Cart } from './entities/carrito.entity';
import { Product } from '../products/entities/product.entity';
import { Response } from '../common/respuesta';
@EntityRepository(Cart_Product)
export class CarProductRepository extends Repository<Cart_Product> {
  private logger = new Logger('ProductCarritoRepository');

  getCarProductRepository() {
    return getRepository(Cart_Product);
  }

  async addProduct(addProductDto: AddProductDto): Promise<Cart_Product> {
    const { cartId, productId, amount } = addProductDto;
    try {
      const cart = new Cart();
      cart.id = cartId;
      const product = new Product();
      product.id = productId;
      const addProduct: Cart_Product = {
        id: undefined,
        cart,
        product,
        amount,
      };
      return await this.getCarProductRepository().save(addProduct);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findCarProduct(id: string): Promise<Cart_Product> {
    let carrito: Cart_Product;
    if (isUUID(id))
      carrito = await this.getCarProductRepository().findOne({ id: id });
    if (!carrito) throw new NotFoundException(`id : ${id} not found`);
    return carrito;
  }

  async findCart(idCar: string): Promise<Array<Cart_Product>> {
    if (isUUID(idCar)) {
      const cart = await this.getCarProductRepository().find({
        where: { cart: idCar },
        relations: ['cart', 'product'],
      });
      return cart;
    } else {
      throw new NotFoundException(`id : ${idCar} not found`);
    }
  }

  async updateProduct(
    id: string,
    updateAddProductDto: UpdateAddProductDto,
  ): Promise<Cart_Product | Response> {
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
      return this.handleDBExceptions(error);
    }
  }

  async removeProduct(id: string): Promise<Cart_Product> {
    const product = await this.findCarProduct(id);
    this.getCarProductRepository().remove(product);
    return product;
  }

  handleDBExceptions(error: any): Response {
    if (error.code == '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    return Response.isError('Error iunseperado este id ya exixste');
  }

  async findProduct(id: string): Promise<Cart_Product> {
    let product: Cart_Product;
    if (isUUID(id))
      product = await this.getCarProductRepository().findOne({
        where: { product: id },
        relations: ['cart', 'product'],
      });
    return product;
  }
}
