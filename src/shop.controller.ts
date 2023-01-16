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
import { RangoDTO } from './common/rango.DTO';
import { CreateCarritoDto } from './carrito/dto/create-carrito.dto';
import { AddProductDto } from './carrito/dto/create-car_product.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.shopService.createProduct(createProductDto);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.shopService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  removeProduct(@Param('id') id: string) {
    return this.shopService.removeProduct(id);
  }

  @Get()
  findAllProducts(@Query() paginationDTO: PaginationDTO) {
    return this.shopService.findProducts(paginationDTO);
  }

  @Get('/ordena')
  findNameAscDec(@Query() paginationDTO: PaginationDTO) {
    return this.shopService.findNamePrecioAscDec(paginationDTO);
  }

  @Get('/term/:term')
  findOne(@Param('term') term: string) {
    return this.shopService.findIdNombre(term);
  }

  @Get('/rang')
  findRangPrecio(
    @Body() rangoDTO: RangoDTO,
    @Query() paginationDTO: PaginationDTO,
  ) {
    return this.shopService.findRangPrecio(rangoDTO, paginationDTO);
  }

  @Post('/carrito')
  createCarrito(@Body() createCarritoDto: CreateCarritoDto) {
    return this.shopService.createCarrito(createCarritoDto);
  }

  @Post('/addProduct')
  addProduct(@Body() addProductDto: AddProductDto) {
    return this.shopService.addProduct(addProductDto);
  }
}
