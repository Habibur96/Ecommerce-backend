import { Product } from './product.interface';
import {ProductModel} from './product.model';

const createProductIntoDB = async (product: Product) => {

  const result = await ProductModel.create(product);

  return result;
};


const getAllProductsFromDB = async (product: Product) => {

  const result = await ProductModel.find(product);

  return result;
};




export const productServices = {
    createProductIntoDB,
    getAllProductsFromDB
}