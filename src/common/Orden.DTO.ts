import { IsEnum, IsOptional, MinLength } from 'class-validator';
import { Order } from './enumerations/order.enum';

export class OrdenDTO {
  @IsOptional()
  term?: string | number;

  @MinLength(1)
  @IsOptional()
  @IsEnum(Order)
  ordena?: Order = Order.ASC;
}
