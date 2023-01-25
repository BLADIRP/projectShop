import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Max } from 'class-validator';
import { OrdenDTO } from './Orden.DTO';

export class PaginationDTO extends OrdenDTO {
  @IsOptional()
  @IsPositive()
  @Max(50)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  offset?: number;
}
