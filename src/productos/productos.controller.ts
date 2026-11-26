import {
  Controller, Get, Post, Put, Delete,
  Param, Body, ParseIntPipe,
} from '@nestjs/common';
import { ProductosService } from './productos.service.js';
import { CreateProductoSchema, UpdateProductoSchema } from './producto.dto.js';
import type { CreateProductoDto, UpdateProductoDto } from './producto.dto.js';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.findOne(id);
  }

  @Post()
  create(@Body({ schema: CreateProductoSchema }) dto: CreateProductoDto) {
    return this.productosService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body({ schema: UpdateProductoSchema }) dto: UpdateProductoDto,
  ) {
    return this.productosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.remove(id);
  }
}