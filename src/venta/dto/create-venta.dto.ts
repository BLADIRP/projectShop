import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsPositive } from 'class-validator';

export class CreateVentaDto {
  @IsDate()
  @Type(() => Date)
  Time: Date;
  @IsNumber()
  @IsPositive()
  TotalOperacion: number;
  @IsNumber()
  @IsPositive()
  TotalProductos: number;
}
