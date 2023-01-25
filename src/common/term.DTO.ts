import { IsOptional, IsString } from 'class-validator';

export class TermDTO {
  @IsOptional()
  @IsString()
  clave?: string;

  @IsOptional()
  @IsString()
  nombre?: string;
}
