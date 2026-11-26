import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  categoria: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column('int')
  stock: number;

  @Column({ default: 'Activo' })
  estado: string;
}