import { Schema, model } from 'mongoose';
import { Product, Variant, Inventory } from './product.interface';

//Create a Schema corresponding to the document interface.
const variantSchema = new Schema<Variant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});
const inventorySchema = new Schema<Inventory>({
  quantity: { type: Number, required: true },
  inStook: { type: Boolean, required: true },
});

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: String, required: true },
  variants: variantSchema,
  inventory: inventorySchema,
});

//Create a model
const Product = model<Product>('Product', productSchema);
