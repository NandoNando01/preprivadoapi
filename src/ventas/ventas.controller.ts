import {
  Controller, Get, Post, Put, Delete,
  Param, Body, ParseIntPipe,
} from '@nestjs/common';
import { VentasService } from './ventas.service.js';
import { CreateVentaSchema, UpdateVentaSchema } from './venta.dto.js';
import type { CreateVentaDto, UpdateVentaDto } from './venta.dto.js';

@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Get()
  findAll() {
    return this.ventasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.ventasService.findOne(id);
  }

  @Post()
  create(@Body({ schema: CreateVentaSchema }) dto: CreateVentaDto) {
    return this.ventasService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body({ schema: UpdateVentaSchema }) dto: UpdateVentaDto,
  ) {
    return this.ventasService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ventasService.remove(id);
  }
}