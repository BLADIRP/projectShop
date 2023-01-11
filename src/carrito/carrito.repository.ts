import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Carrito } from './entities/carrito.entity';
import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { isUUID } from 'class-validator';
import { UpdateCarritoDto } from './dto/update-carrito.dto';

@EntityRepository(Carrito)
export class CarritoRepository extends Repository<Carrito> {
  private logger = new Logger('CarritoRepository');

  getCarritoRepository() {
    return getRepository(Carrito);
  }

  async createCarrito(createCarritoDto: CreateCarritoDto): Promise<Carrito> {
    try {
      const carrito = this.getCarritoRepository().create(createCarritoDto);
      await this.getCarritoRepository().save(carrito);
      return carrito;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
  async findAllCarritos(): Promise<Array<Carrito>> {
    const carritos = this.getCarritoRepository().find();
    return carritos;
  }

  async findCarrito(id: string): Promise<Carrito> {
    let carrito: Carrito;
    if (isUUID(id))
      carrito = await this.getCarritoRepository().findOne({ id: id });
    if (!carrito) throw new NotFoundException(`id : ${id} not found`);
    return carrito;
  }

  async updateCarrito(
    id: string,
    updateCarritoDto: UpdateCarritoDto,
  ): Promise<Carrito> {
    const updateCarrito = await this.getCarritoRepository().preload({
      id: id,
      ...updateCarritoDto,
    });
    if (!updateCarrito)
      throw new NotFoundException(`Product when id: ${id} not found `);
    await this.getCarritoRepository().save(updateCarrito);
    try {
      return updateCarrito;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async removeCarrito(id: string): Promise<Carrito> {
    const carrito = await this.findCarrito(id);
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
