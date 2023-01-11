import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { OperacionRepository } from './operacion.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOperacionDto } from './dto/create-operacion.dto';
import { UpdateOperacionDto } from './dto/update-operacion.dto';

@Injectable()
export class OperacionService {
  private readonly logger = new Logger('CarritoService');
  constructor(
    @InjectRepository(OperacionRepository)
    private operacionRepository: OperacionRepository,
  ) {}

  async create(createOperacionDto: CreateOperacionDto) {
    const operacion =
      this.operacionRepository.createOperacion(createOperacionDto);
    return operacion;
  }

  async findAll() {
    const operacion = this.operacionRepository.findAllOperaciones();
    return operacion;
  }

  async findOne(id: string) {
    const operacion = this.operacionRepository.findOperacion(id);
    return operacion;
  }

  async update(id: string, updateOperacionDto: UpdateOperacionDto) {
    const operacion = this.operacionRepository.updateOperacion(
      id,
      updateOperacionDto,
    );
    return operacion;
  }

  async remove(id: string) {
    const operacion = this.operacionRepository.removeOperacion(id);
    return `Operacion: ${(await operacion).id} fue removido`;
  }

  handleDBExceptions(error: any) {
    if (error.code == '23505') throw new BadRequestException(error.detail);
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
