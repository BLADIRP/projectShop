import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

//esta parte ayuda a tener los requerimientos de la base de datos
export class CreateProductDto {
  @IsString()
  @MinLength(1)
  nombre: string;
  @IsNumber()
  @IsPositive()
  @IsOptional()
  PrecioVenta: number;
  @IsNumber()
  @IsPositive()
  PrecioCompra: number;
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock: number;
  @IsString()
  @MinLength(1)
  @IsOptional()
  description: string;
}
