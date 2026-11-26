import { z } from 'zod';

export const CreateVentaSchema = z.object({
  productoId: z.number().int().positive('Producto requerido'),
  cliente: z.string().min(1, 'Cliente requerido'),
  monto: z.number().positive('Monto debe ser positivo'),
  metodo: z.string().min(1, 'Método de pago requerido'),
  estado: z.enum(['Completado', 'Pendiente', 'Cancelado']).optional().default('Completado'),
});

export type CreateVentaDto = z.infer<typeof CreateVentaSchema>;

export const UpdateVentaSchema = z.object({
  productoId: z.number().int().positive().optional(),
  cliente: z.string().min(1).optional(),
  monto: z.number().positive().optional(),
  metodo: z.string().min(1).optional(),
  estado: z.enum(['Completado', 'Pendiente', 'Cancelado']).optional(),
});

export type UpdateVentaDto = z.infer<typeof UpdateVentaSchema>;