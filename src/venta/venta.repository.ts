import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Sale } from './entities/venta.entity';
import { EntityRepository, Repository, getRepository } from 'typeorm';
import { CreateSaleDto } from './dto/create-venta.dto';
import { isUUID } from 'class-validator';
import { UpdateVentaDto } from './dto/update-venta.dto';

@EntityRepository(Sale)
export class VentaRepository extends Repository<Sale> {
  private logger = new Logger('CarritoRepository');

  getVentaRepository() {
    return getRepository(Sale);
  }

  async createSale(createSaleDto: CreateSaleDto): Promise<Sale> {
    try {
      const venta = this.getVentaRepository().create(createSaleDto);
      await this.getVentaRepository().save(venta);
      return venta;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
  async findAllVentas(): Promise<Array<Sale>> {
    const ventas = this.getVentaRepository().find();
    return ventas;
  }

  async findVenta(id: string): Promise<Sale> {
    let venta: Sale;
    if (isUUID(id)) venta = await this.getVentaRepository().findOne({ id: id });
    if (!venta) throw new NotFoundException(`id : ${id} not found`);
    return venta;
  }

  async updateVenta(id: string, updateVentaDto: UpdateVentaDto): Promise<Sale> {
    const updateVenta = await this.getVentaRepository().preload({
      id: id,
      ...updateVentaDto,
    });
    if (!updateVenta)
      throw new NotFoundException(`Product when id: ${id} not found `);
    await this.getVentaRepository().save(updateVenta);
    try {
      return updateVenta;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async removeVenta(id: string): Promise<Sale> {
    const venta = await this.findVenta(id);
    this.getVentaRepository().remove(venta);
    return venta;
  }

  handleDBExceptions(error: any) {
    if (error.code == '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
