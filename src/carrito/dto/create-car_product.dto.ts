import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class AddProductDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  productId: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  cartId: string;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  amount?: number;
}
