import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCarritoDto {
  @IsString()
  @MinLength(1)
  nombre: string;
  @IsBoolean()
  estado: boolean;
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  TimeCreacion: Date;
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  TimeCompra: Date;
}
