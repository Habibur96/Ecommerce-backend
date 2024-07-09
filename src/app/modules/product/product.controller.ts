import { Request, Response } from 'express';
import { productServices } from './product.service';

import { Product } from './product.interface';
import { ProductValidationSchema } from './product.validation';

//Create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    const zodparseData = ProductValidationSchema.parse(productData);

    const result = await productServices.createProductIntoDB(
      zodparseData as Product,
    );

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed create product',
    });
  }
};

//Retrieve a List of All Products and Search Product
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.searchTerm as string;
    let products;

    if (searchTerm) {
      products = await productServices.searchProductFromDB(searchTerm);
    } else {
      products = await productServices.getAllProductsFromDB();
    }
    res.status(200).json({
      success: true,
      message: `Products ${searchTerm ? `matching search term '${searchTerm}'` : 'fetched successfully!'}`,
      data: products,
    });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to search products',
    });
  }
};

//Retrieve a Specific Product by ID
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const result = await productServices.getSingleProductFromDB(id);
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to found product',
    });
  }
};

// //Delete a Product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await productServices.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

//Update Product Information
const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const filter = { _id: id };
    const options = { upsert: true };
    const updateProduct = req.body;
    const updateNewProduct = {
      $set: {
        name: updateProduct.name,
        description: updateProduct.description,
        price: updateProduct.price,
        category: updateProduct.category,
        tags: updateProduct.tags,
        variants: updateProduct.variants,
        inventory: updateProduct.inventory,
      },
    };

    const result = await productServices.updateProductFromDB(
      filter,
      updateNewProduct,
      options,
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Not updated',
    });
  }
};

export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
