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
import { CreateTransactionDTO } from './dto/create-operacion.dto';
import { UpdateTransactionDto } from './dto/update-operacion.dto';

@Controller('operacion')
export class OperacionController {
  constructor(private readonly operacionService: OperacionService) {}

  @Post()
  create(@Body() createTransactionDTO: CreateTransactionDTO) {
    return this.operacionService.create(createTransactionDTO);
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
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.operacionService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operacionService.remove(id);
  }
}
