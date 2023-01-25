import { IsString, MinLength } from 'class-validator';

export class IdCarDTO {
  @IsString()
  @MinLength(1)
  idCarrito: string;
}
