import { IsEnum, IsOptional, MinLength } from 'class-validator';
import { Order } from './enumerations/order.enum';
import { RangoDTO } from './rango.DTO';

export class OrdenDTO extends RangoDTO {
  @IsOptional()
  term?: string | number;

  @MinLength(1)
  @IsOptional()
  @IsEnum(Order)
  ordena?: Order = Order.ASC;
}
