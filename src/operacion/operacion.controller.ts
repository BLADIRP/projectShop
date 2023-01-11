import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OperacionService } from './operacion.service';
import { CreateOperacionDto } from './dto/create-operacion.dto';
import { UpdateOperacionDto } from './dto/update-operacion.dto';

@Controller('operacion')
export class OperacionController {
  constructor(private readonly operacionService: OperacionService) {}

  @Post()
  create(@Body() createOperacionDto: CreateOperacionDto) {
    return this.operacionService.create(createOperacionDto);
  }

  @Get()
  findAll() {
    return this.operacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operacionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOperacionDto: UpdateOperacionDto,
  ) {
    return this.operacionService.update(id, updateOperacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operacionService.remove(id);
  }
}
