import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { OperacionRepository } from './operacion.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDTO } from './dto/create-operacion.dto';
import { UpdateTransactionDto } from './dto/update-operacion.dto';

@Injectable()
export class OperacionService {
  private readonly logger = new Logger('CarritoService');
  constructor(
    @InjectRepository(OperacionRepository)
    private operacionRepository: OperacionRepository,
  ) {}

  async create(createTransactionDTO: CreateTransactionDTO) {
    const operacion =
      this.operacionRepository.createOperacion(createTransactionDTO);
    return operacion;
  }

  async findAll() {
    const operacion = this.operacionRepository.findAllOperaciones('A');
    return operacion;
  }

  async findOne(id: string) {
    const operacion = this.operacionRepository.findOperacion(id);
    return operacion;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const operacion = this.operacionRepository.updateOperacion(
      id,
      updateTransactionDto,
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
