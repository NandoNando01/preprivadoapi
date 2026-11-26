import { z } from 'zod';

export const CreateProductoSchema = z.object({
  nombre: z.string().min(1, 'Nombre requerido'),
  categoria: z.string().min(1, 'Categoría requerida'),
  precio: z.number().positive('Precio debe ser positivo'),
  stock: z.number().int().min(0, 'Stock no puede ser negativo'),
  estado: z.enum(['Activo', 'Inactivo']).optional().default('Activo'),
});

export type CreateProductoDto = z.infer<typeof CreateProductoSchema>;

export const UpdateProductoSchema = z.object({
  nombre: z.string().min(1).optional(),
  categoria: z.string().min(1).optional(),
  precio: z.number().positive().optional(),
  stock: z.number().int().min(0).optional(),
  estado: z.enum(['Activo', 'Inactivo']).optional(),
});

export type UpdateProductoDto = z.infer<typeof UpdateProductoSchema>;