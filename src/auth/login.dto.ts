import { z } from 'zod';

export const LoginDtoSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

export type LoginDto = z.infer<typeof LoginDtoSchema>;