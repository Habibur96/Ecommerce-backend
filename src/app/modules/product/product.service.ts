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

const searchProductFromDB = async (searchTerm: string) => {
  const query = searchTerm
    ? { name: new RegExp(searchTerm, 'i'), isDeleted: false }
    : { isDeleted: false };
  return await ProductModel.find(query);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSingleProductFromDB = async (productId: any) => {
  const result = await ProductModel.findOne({ _id: productId });
  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateProductFromDB = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateNewProduct: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any,
) => {
  try {
    const result = await ProductModel.updateOne(
      filter,
      updateNewProduct,
      options,
    );
    return result;
  } catch (err) {
    console.error('Error updating product in database:', err);
    throw err;
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteProductFromDB = async (productId: any) => {
  const result = await ProductModel.deleteOne(
    { _id: productId },
    { isDeleted: true },
  );
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
