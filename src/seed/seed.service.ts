import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../productos/producto.entity.js';
import { Venta } from '../ventas/venta.entity.js';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
  ) {}

  async onModuleInit() {
    await this.seedProductos();
    await this.seedVentas();
  }

  private async seedProductos() {
    const count = await this.productoRepository.count();
    if (count > 0) return;

    const productos = this.productoRepository.create([
      { nombre: 'Laptop Pro 16"', categoria: 'Computadoras', precio: 2399, stock: 45, estado: 'Activo' },
      { nombre: 'Monitor 27" 4K', categoria: 'Monitores', precio: 849, stock: 120, estado: 'Activo' },
      { nombre: 'Teclado Mecánico RGB', categoria: 'Periféricos', precio: 159, stock: 200, estado: 'Activo' },
      { nombre: 'Mouse Inalámbrico', categoria: 'Periféricos', precio: 89, stock: 350, estado: 'Activo' },
      { nombre: 'Silla Ergonómica', categoria: 'Muebles', precio: 1299, stock: 18, estado: 'Activo' },
    ]);
    await this.productoRepository.save(productos);
    this.logger.log('5 productos de ejemplo creados');
  }

  private async seedVentas() {
    const count = await this.ventaRepository.count();
    if (count > 0) return;

    const laptop = await this.productoRepository.findOneBy({ nombre: 'Laptop Pro 16"' });
    const monitor = await this.productoRepository.findOneBy({ nombre: 'Monitor 27" 4K' });
    const teclado = await this.productoRepository.findOneBy({ nombre: 'Teclado Mecánico RGB' });
    const mouse = await this.productoRepository.findOneBy({ nombre: 'Mouse Inalámbrico' });
    const silla = await this.productoRepository.findOneBy({ nombre: 'Silla Ergonómica' });

    if (!laptop || !monitor || !teclado || !mouse || !silla) return;

    const hoy = new Date();
    const ayer = new Date(hoy);
    ayer.setDate(ayer.getDate() - 1);

    const ventas = this.ventaRepository.create([
      { productoId: laptop.id, cliente: 'Carlos Mendoza', monto: 2399, metodo: 'Tarjeta', estado: 'Completado', createdAt: hoy },
      { productoId: monitor.id, cliente: 'Ana García', monto: 849, metodo: 'Transferencia', estado: 'Completado', createdAt: hoy },
      { productoId: teclado.id, cliente: 'Luis Torres', monto: 159, metodo: 'Tarjeta', estado: 'Pendiente', createdAt: ayer },
      { productoId: mouse.id, cliente: 'Sofía Rivera', monto: 89, metodo: 'Efectivo', estado: 'Completado', createdAt: ayer },
      { productoId: silla.id, cliente: 'Pedro Sánchez', monto: 1299, metodo: 'Transferencia', estado: 'Cancelado', createdAt: ayer },
    ]);

    await Promise.all([
      this.ventaRepository.save(ventas),
      this.productoRepository.decrement({ id: laptop.id }, 'stock', 1),
      this.productoRepository.decrement({ id: monitor.id }, 'stock', 1),
      this.productoRepository.decrement({ id: mouse.id }, 'stock', 1),
    ]);
    this.logger.log('5 ventas de ejemplo creadas');
  }
}