import { z } from 'zod';

const orderSchema = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number().positive(),
  quantity: z.number().positive().int(),
});

export const OrderValidationSchema = orderSchema;
