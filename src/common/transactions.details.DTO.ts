import { Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { TransactionsDTO } from './Transactions.DTO';

export class TransactionsDetailsDTO {
  @IsInt()
  @Type(() => TransactionsDTO)
  @IsOptional()
  @IsArray()
  transactions?: TransactionsDTO[];

  @IsString()
  @Type(() => Number)
  @IsOptional()
  subTotal?: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  discount?: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  totalAmount?: number;
}
