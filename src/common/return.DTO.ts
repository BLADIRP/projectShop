import { IsDate, IsString, MinLength } from 'class-validator';

export class ReturnDTO<G> {
  constructor(message, status, entity, time) {
    this.message = message;
    this.status = status;
    this.entity = entity;
    this.time = time;
  }

  @IsString()
  @MinLength(1)
  message: string;
  @IsString()
  @MinLength(1)
  status: string;
  entity: G;
  @IsDate()
  time: Date;
}
