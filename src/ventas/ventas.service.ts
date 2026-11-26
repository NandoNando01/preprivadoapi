import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from './venta.entity.js';
import { Producto } from '../productos/producto.entity.js';
import type { CreateVentaDto, UpdateVentaDto } from './venta.dto.js';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async findAll(): Promise<Venta[]> {
    return this.ventaRepository.find({ relations: { producto: true } });
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventaRepository.findOne({ where: { id }, relations: { producto: true } });
    if (!venta) throw new NotFoundException('Venta no encontrada');
    return venta;
  }

  async create(dto: CreateVentaDto): Promise<Venta> {
    const producto = await this.productoRepository.findOneBy({ id: dto.productoId });
    if (!producto) throw new NotFoundException('Producto no encontrado');

    if (dto.estado === 'Completado') {
      if (producto.stock < 1) throw new BadRequestException('Stock insuficiente');
      producto.stock -= 1;
      await this.productoRepository.save(producto);
    }

    const venta = this.ventaRepository.create({
      productoId: dto.productoId,
      cliente: dto.cliente,
      monto: dto.monto,
      metodo: dto.metodo,
      estado: dto.estado,
    });

    return this.ventaRepository.save(venta);
  }

  async update(id: number, dto: UpdateVentaDto): Promise<Venta> {
    const venta = await this.findOne(id);

    if (dto.estado && dto.estado !== venta.estado) {
      const producto = await this.productoRepository.findOneBy({ id: venta.productoId });
      if (!producto) throw new NotFoundException('Producto no encontrado');

      if (dto.estado === 'Completado') {
        if (producto.stock < 1) throw new BadRequestException('Stock insuficiente');
        producto.stock -= 1;
        await this.productoRepository.save(producto);
      } else if (venta.estado === 'Completado') {
        producto.stock += 1;
        await this.productoRepository.save(producto);
      }
    }

    Object.assign(venta, dto);
    return this.ventaRepository.save(venta);
  }

  async remove(id: number): Promise<void> {
    const venta = await this.findOne(id);

    if (venta.estado === 'Completado') {
      const producto = await this.productoRepository.findOneBy({ id: venta.productoId });
      if (producto) {
        producto.stock += 1;
        await this.productoRepository.save(producto);
      }
    }

    await this.ventaRepository.remove(venta);
  }
}