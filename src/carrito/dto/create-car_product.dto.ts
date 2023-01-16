import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class AddProductDto {
  @IsString()
  @MinLength(1)
  fkProduct: string;

  @IsString()
  @MinLength(1)
  fkCar: string;

  @IsNumber()
  @IsOptional()
  cantidad?: number;
}
