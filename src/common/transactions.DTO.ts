import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class TransactionsDTO {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  quantity?: number;

  @IsString()
  @Type(() => String)
  @IsOptional()
  description?: string;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  salePrice?: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  purchasePrice?: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  profitPercentage: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  total: number;
}
