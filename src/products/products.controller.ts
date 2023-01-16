import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDTO } from 'src/common/pagination.DTO';
import { RangoDTO } from 'src/common/rango.DTO';

@Controller('products')
export class ProductsController {
  private readonly logger = new Logger('ProductsService');
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(@Query() paginationDTO: PaginationDTO) {
    return this.productsService.findAll(paginationDTO);
  }

  @Get('/rang')
  findRang(@Body() rangoDTO: RangoDTO, @Query() paginationDTO: PaginationDTO) {
    return this.productsService.rango(rangoDTO, paginationDTO);
  }
  @Get('/ordena')
  findNameAscDec(@Query() paginationDTO: PaginationDTO) {
    return this.productsService.findNamePrecioAscDec(paginationDTO);
  }
  @Get('/term/:term')
  findOne(@Param('term') term: string) {
    return this.productsService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
