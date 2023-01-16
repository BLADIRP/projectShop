import { PartialType } from '@nestjs/mapped-types';
import { AddProductDto } from './create-car_product.dto';

export class UpdateAddProductDto extends PartialType(AddProductDto) {}
