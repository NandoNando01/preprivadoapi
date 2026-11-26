import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentasController } from './ventas.controller.js';
import { VentasService } from './ventas.service.js';
import { Venta } from './venta.entity.js';
import { Producto } from '../productos/producto.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Venta, Producto])],
  controllers: [VentasController],
  providers: [VentasService],
})
export class VentasModule {}