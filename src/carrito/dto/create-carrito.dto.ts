import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCartDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsBoolean()
  @IsOptional()
  state: boolean;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  creationTime: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  purchaseTime: Date;
}
