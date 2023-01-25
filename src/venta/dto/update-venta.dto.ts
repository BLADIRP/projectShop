import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleDto } from './create-venta.dto';

export class UpdateVentaDto extends PartialType(CreateSaleDto) {}
