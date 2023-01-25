import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { UpdateCartDto } from './dto/update-carrito.dto';
import { CreateCartDto } from './dto/create-carrito.dto';

@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.carritoService.create(createCartDto);
  }

  @Get()
  findAll() {
    return this.carritoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carritoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarritoDto: UpdateCartDto) {
    return this.carritoService.update(id, updateCarritoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carritoService.remove(id);
  }
}
