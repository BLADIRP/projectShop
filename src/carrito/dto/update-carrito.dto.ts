import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-carrito.dto';

export class UpdateCartDto extends PartialType(CreateCartDto) {}
