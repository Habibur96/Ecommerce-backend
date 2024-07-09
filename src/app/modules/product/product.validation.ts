import { z } from 'zod';

// Define the Variant schema
const variantSchema = z.object({
  type: z.string().nonempty('Type is required'),
  value: z.string().nonempty('Value is required'),
});

// Define the Inventory schema
const inventorySchema = z.object({
  quantity: z
    .number()
    .int()
    .nonnegative('Quantity must be a non-negative integer'),
  inStock: z.boolean(),
});

// Define the Product schema
const productSchema = z.object({
  name: z.string().nonempty('Name is required'),
  description: z.string().nonempty('Description is required'),
  price: z.number().positive('Price must be a positive number'),
  category: z.string().nonempty('Category is required'),
  tags: z.array(z.string()).nonempty('Tags are required'),
  variants: z.array(variantSchema).nonempty('Variants are required'),
  inventory: inventorySchema,
  isDeleted: z.boolean().default(false),
  // isUpdaetd: z.boolean().default(false)
});

// Export the Product schema
export const ProductValidationSchema = productSchema;
