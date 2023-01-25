import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UpdateCartDto } from './dto/update-carrito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CarritoRepository } from './carrito.repository';
import { CreateCartDto } from './dto/create-carrito.dto';

@Injectable()
export class CarritoService {
  private readonly logger = new Logger('CarritoService');
  constructor(
    @InjectRepository(CarritoRepository)
    private carritoRepository: CarritoRepository,
  ) {}

  async create(createCartDto: CreateCartDto) {
    const carrito = this.carritoRepository.createCart(createCartDto);
    return carrito;
  }

  async findAll() {
    const carritos = this.carritoRepository.findAllCarritos();
    return carritos;
  }

  async findOne(id: string) {
    const carrito = this.carritoRepository.findCart(id);
    return carrito;
  }

  async update(id: string, updateCarritoDto: UpdateCartDto) {
    const carrito = this.carritoRepository.updateCart(id, updateCarritoDto);
    return carrito;
  }

  async remove(id: string) {
    const carrito = this.carritoRepository.removeCarrito(id);
    return `Carrito: ${(await carrito).id} fue removido`;
  }

  handleDBExceptions(error: any) {
    if (error.code == '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
