import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
export class CreateTransactionDTO {
  @IsString()
  @IsOptional()
  @MinLength(1)
  description: string;

  @IsNumber()
  @IsPositive()
  quantityProducts: number;

  @IsNumber()
  @IsPositive()
  salePrice: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  discount: number;

  @IsNumber()
  @IsPositive()
  total: number;

  @IsNumber()
  @IsPositive()
  purchasePrice: number;

  @IsNumber()
  @IsPositive()
  utility: number;

  @IsString()
  @IsOptional()
  @MinLength(1)
  cartId: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  saleId: string;
}
