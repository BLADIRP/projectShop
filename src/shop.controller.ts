import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ShopService } from './shop.service';
import { CreateProductDto } from './products/dto/create-product.dto';
import { UpdateProductDto } from './products/dto/update-product.dto';
import { PaginationDTO } from './common/pagination.DTO';
import { AddProductDto } from './carrito/dto/create-car_product.dto';
import { CreateCartDto } from './carrito/dto/create-carrito.dto';
import { DiscontDTO } from './discounts/discount.dto';
@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.shopService.createProduct(createProductDto);
  }
  //1
  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.shopService.updateProduct(id, updateProductDto);
  }
  //2
  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return this.shopService.removeProduct(id);
  }
  //3
  @Get()
  findAllProducts(@Query() paginationDTO: PaginationDTO) {
    return this.shopService.findProducts(paginationDTO);
  }
  //4
  @Post('/carrito')
  createCart(@Body() createCartto: CreateCartDto) {
    return this.shopService.createCart(createCartto);
  }
  //5
  @Post('/addProduct')
  addProduct(@Body() addProductDto: AddProductDto) {
    return this.shopService.addProduct(addProductDto);
  }
  //6
  @Delete('/venta/:id')
  cancelSale(@Param('id') id: string) {
    return this.shopService.removeCart(id);
  }

  //7
  @Post('/venta/:id')
  createSale(@Param('id') id: string) {
    return this.shopService.createSale(id);
  }
  //8
  @Post('/transactions')
  transaction(@Body() discontDTO: DiscontDTO) {
    return this.shopService.detailsTransactions(discontDTO);
  }

  @Post('/search')
  search(@Body() addProductDto: AddProductDto) {
    return this.shopService.cartProductCheck(addProductDto);
  }
}
