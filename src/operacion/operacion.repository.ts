import { EntityRepository, Repository, getRepository } from 'typeorm';
import { Transaction } from './entities/operacion.entity';
import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDTO } from './dto/create-operacion.dto';
import { isUUID } from 'class-validator';
import { UpdateTransactionDto } from './dto/update-operacion.dto';
import { Cart } from '../carrito/entities/carrito.entity';
import { Sale } from '../venta/entities/venta.entity';

@EntityRepository(Transaction)
export class OperacionRepository extends Repository<Transaction> {
  private logger = new Logger('OperacionRepository');

  getOperacionRepository() {
    return getRepository(Transaction);
  }

  async createOperacion(
    createTransactionDTO: CreateTransactionDTO,
  ): Promise<Transaction> {
    try {
      const carrito: Cart = {
        id: createTransactionDTO.cartId,
        name: undefined,
        state: undefined,
        purchaseTime: undefined,
        creationTime: undefined,
        transaction: undefined,
        cart_product: undefined,
      };

      const sale: Sale = {
        id: createTransactionDTO.saleId,
        time: undefined,
        totalProducts: undefined,
        totalTransaction: undefined,
        transaction: undefined,
      };

      const creatOperacion: Transaction = {
        id: undefined,
        description: createTransactionDTO.description,
        quantityProducts: createTransactionDTO.quantityProducts,
        salePrice: createTransactionDTO.purchasePrice,
        discount: createTransactionDTO.discount,
        total: createTransactionDTO.total,
        purchasePrice: createTransactionDTO.salePrice,
        Utilidad: createTransactionDTO.utility,
        cart: carrito,
        sale: sale,
      };
      const operacion = await this.getOperacionRepository().save(
        creatOperacion,
      );
      return operacion;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
  async findAllOperaciones(id: string): Promise<Array<Transaction>> {
    const operaciones = this.getOperacionRepository().find({
      where: { carrito: id },
      loadRelationIds: {
        relations: ['carrito'],
      },
    });
    return operaciones;
  }

  async findOperacion(id: string): Promise<Transaction> {
    console.log(`hola estoy aqui`);
    let operacion: Transaction;
    if (isUUID(id))
      operacion = await this.getOperacionRepository().findOne({ id: id });
    if (!operacion) throw new NotFoundException(`id : ${id} not found`);
    return operacion;
  }

  async updateOperacion(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    const updateOperacion = await this.getOperacionRepository().preload({
      id: id,
      ...updateTransactionDto,
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

  async removeOperacion(id: string): Promise<Transaction> {
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

  async findOperacionBySaleId(idSale: string): Promise<Array<Transaction>> {
    let operacion: Transaction[];
    if (isUUID(idSale)) {
      operacion = await this.getOperacionRepository().find({
        where: { sale: idSale },
        loadRelationIds: { relations: ['cart', 'sale'] },
      });
    }
    console.log(operacion);
    if (operacion.length == 0)
      throw new NotFoundException(`id : ${idSale} not found`);
    return operacion;
  }
}
