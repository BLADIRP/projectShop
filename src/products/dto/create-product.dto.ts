import {
  IsInt,
  IsLowercase,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUppercase,
  MinLength,
} from 'class-validator';

//esta parte ayuda a tener los requerimientos de la base de datos
export class CreateProductDto {
  @IsString()
  @MinLength(1)
  @IsLowercase()
  name: string;

  @IsString()
  @MinLength(1)
  @IsUppercase()
  key: string;

  @IsNumber()
  @IsPositive()
  salePrice: number;

  @IsNumber()
  @IsPositive()
  purchasePrice: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock: number;

  @IsString()
  @MinLength(1)
  @IsOptional()
  description: string;
}
