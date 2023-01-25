import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Cart } from './entities/carrito.entity';
import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { UpdateCartDto } from './dto/update-carrito.dto';
import { CreateCartDto } from './dto/create-carrito.dto';

@EntityRepository(Cart)
export class CarritoRepository extends Repository<Cart> {
  private logger = new Logger('CarritoRepository');

  getCarritoRepository() {
    return getRepository(Cart);
  }

  async createCart(createCartDto: CreateCartDto): Promise<Cart> {
    try {
      const cart = this.getCarritoRepository().create(createCartDto);
      await this.getCarritoRepository().save(cart);
      return cart;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAllCarritos(): Promise<Array<Cart>> {
    const carritos = this.getCarritoRepository().find();
    return carritos;
  }

  async findCart(id: string): Promise<Cart> {
    let cart: Cart;
    if (isUUID(id))
      cart = await this.getCarritoRepository().findOne({ id: id });
    if (!cart) throw new NotFoundException(`id : ${id} not found`);
    return cart;
  }

  async updateCart(id: string, updateCartDto: UpdateCartDto): Promise<Cart> {
    const updateCart = await this.getCarritoRepository().preload({
      id: id,
      ...updateCartDto,
    });
    if (!updateCart)
      throw new NotFoundException(`Product when id: ${id} not found `);
    await this.getCarritoRepository().save(updateCart);
    try {
      return updateCart;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async removeCarrito(id: string): Promise<Cart> {
    const carrito = await this.findCart(id);
    this.getCarritoRepository().remove(carrito);
    return carrito;
  }

  handleDBExceptions(error: any) {
    if (error.code == '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
