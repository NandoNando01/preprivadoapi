import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeedService } from './seed.service.js';
import { Producto } from '../productos/producto.entity.js';
import { Venta } from '../ventas/venta.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Venta])],
  providers: [SeedService],
})
export class SeedModule {}