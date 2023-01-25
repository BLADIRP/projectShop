import {
  IsPositive,
  IsEnum,
  IsInt,
  IsString,
  MinLength,
} from 'class-validator';
import { DiscountType } from './enums/discount.type.emun';
import { Type } from 'class-transformer';

export class DiscontDTO {
  @IsInt()
  @Type(() => Number)
  @IsPositive()
  discount = 1;

  @IsEnum(DiscountType)
  tipoDiscont: DiscountType = DiscountType.NONE;

  @IsString()
  @MinLength(1)
  idSale: string;
}
