import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class RangoDTO {
  @IsInt()
  @Type(() => Number)
  max: number;

  @IsInt()
  @Type(() => Number)
  min: number;
}
