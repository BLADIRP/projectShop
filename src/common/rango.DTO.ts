import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { TermDTO } from './term.DTO';

export class RangoDTO extends TermDTO {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  max?: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  min?: number;
}
