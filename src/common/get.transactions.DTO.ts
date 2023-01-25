import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class GetTransactionsDTO {
  @IsInt()
  @Type(() => Number)
  discount?: number;

  @IsString()
  @Type(() => String)
  idSale?: string;
}
