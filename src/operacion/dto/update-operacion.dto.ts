import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDTO } from './create-operacion.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDTO) {}
