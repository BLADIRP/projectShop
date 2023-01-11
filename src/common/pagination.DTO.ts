import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';
import { OrdenDTO } from './Orden.DTO';

export class PaginationDTO extends OrdenDTO {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  offset?: number;
}
