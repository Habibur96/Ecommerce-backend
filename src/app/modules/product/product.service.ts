import { Product } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);

  return result;
};

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSingleProductFromDB = async (productId: any) => {
  const result = await ProductModel.findOne({ _id: productId });
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateProductFromDB = async (property: any) => {
  const result = await ProductModel.updateOne(
    property.updateNewProduct,
    property.filter,
    property.options,
  );
  console.log('Result = ', result);
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteProductFromDB = async (productId: any) => {
  const result = await ProductModel.deleteOne(
    { _id: productId },
    { isDeleted: true },
  );
  return result;
};

const searchProductFromDB = async (search: string) => {
  const query = { name: { $regex: search } };
  const result =await ProductModel.find(query);
  // const result = await cursor.toArray();
  return result;
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductFromDB,
  deleteProductFromDB,
  searchProductFromDB,
};
