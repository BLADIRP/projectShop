import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Operacion } from './entities/operacion.entity';
import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateOperacionDto } from './dto/create-operacion.dto';
import { isUUID } from 'class-validator';
import { UpdateOperacionDto } from './dto/update-operacion.dto';

@EntityRepository(Operacion)
export class OperacionRepository extends Repository<Operacion> {
  private logger = new Logger('OperacionRepository');

  getOperacionRepository() {
    return getRepository(Operacion);
  }

  async createOperacion(
    createOperacionDto: CreateOperacionDto,
  ): Promise<Operacion> {
    try {
      const operacion =
        this.getOperacionRepository().create(createOperacionDto);
      await this.getOperacionRepository().save(operacion);
      return operacion;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
  async findAllOperaciones(): Promise<Array<Operacion>> {
    const operaciones = this.getOperacionRepository().find();
    return operaciones;
  }

  async findOperacion(id: string): Promise<Operacion> {
    console.log(`hola estoy aqui`);
    let operacion: Operacion;
    if (isUUID(id))
      operacion = await this.getOperacionRepository().findOne({ id: id });
    if (!operacion) throw new NotFoundException(`id : ${id} not found`);
    return operacion;
  }

  async updateOperacion(
    id: string,
    updateOperacionDto: UpdateOperacionDto,
  ): Promise<Operacion> {
    const updateOperacion = await this.getOperacionRepository().preload({
      id: id,
      ...updateOperacionDto,
    });
    if (!updateOperacion)
      throw new NotFoundException(`Product when id: ${id} not found `);
    await this.getOperacionRepository().save(updateOperacion);
    try {
      return updateOperacion;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async removeOperacion(id: string): Promise<Operacion> {
    const operacion = await this.findOperacion(id);
    this.getOperacionRepository().remove(operacion);
    return operacion;
  }

  handleDBExceptions(error: any) {
    if (error.code == '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
