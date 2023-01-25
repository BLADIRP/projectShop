import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VentaRepository } from './venta.repository';
import { CreateSaleDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';

@Injectable()
export class VentaService {
  private readonly logger = new Logger('CarritoService');
  constructor(
    @InjectRepository(VentaRepository)
    private ventaRepository: VentaRepository,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    const venta = this.ventaRepository.createSale(createSaleDto);
    return venta;
  }

  async findAll() {
    const ventas = this.ventaRepository.findAllVentas();
    return ventas;
  }

  async findOne(id: string) {
    const venta = this.ventaRepository.findVenta(id);
    return venta;
  }

  async update(id: string, updateVentaDto: UpdateVentaDto) {
    const venta = this.ventaRepository.updateVenta(id, updateVentaDto);
    return venta;
  }

  async remove(id: string) {
    const venta = this.ventaRepository.removeVenta(id);
    return `Venta: ${(await venta).id} fue removid`;
  }

  handleDBExceptions(error: any) {
    if (error.code == '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
