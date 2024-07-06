import { Schema, model } from 'mongoose';
import { Product, Variant, Inventory } from './product.interface';

// Create a Schema corresponding to the document interface.
const variantSchema = new Schema<Variant>(
  {
    type: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false },
);

const inventorySchema = new Schema<Inventory>(
  {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  { _id: false },
);

const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantSchema], required: true },
  inventory: inventorySchema,
  isDeleted: {
    type: Boolean,
    default: false,
  },
  // isUpdaetd: {
  //   type: Boolean,
  //   default: false,
  // },
});

//Query Middleware

productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Create a model
export const ProductModel = model<Product>('Product', productSchema);
