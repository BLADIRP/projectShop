import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
export class CreateOperacionDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  description: string;
  @IsNumber()
  @IsPositive()
  CantidadProducto: number;
  @IsNumber()
  @IsPositive()
  PrecioVenta: number;
  @IsNumber()
  @Min(0)
  @Max(100)
  Descuento: number;
  @IsNumber()
  @IsPositive()
  Total: number;
  @IsNumber()
  @IsPositive()
  PrecioCompra: number;
  @IsNumber()
  @IsPositive()
  Utilidad: number;
}
