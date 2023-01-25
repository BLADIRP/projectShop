import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateSaleDto {
  @IsDate()
  @Type(() => Date)
  time: Date;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  totalTransaction: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  totalProducts: number;
}
