import { Body, Controller, Post } from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateProductDto } from './products/dto/create-product.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.product;
  }
}