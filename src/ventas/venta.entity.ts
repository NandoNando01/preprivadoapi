import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Producto } from '../productos/producto.entity.js';

@Entity()
export class Venta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productoId: number;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'productoId' })
  producto: Producto;

  @Column()
  cliente: string;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column()
  metodo: string;

  @Column({ default: 'Completado' })
  estado: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}