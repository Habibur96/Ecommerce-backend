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
      message: 'Failed o create product',
    });
  }
};

//Retrieve a List of All Products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Route not found',
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
      message: 'Data not found',
    });
  }
};

//Update Product Information
// const updateProduct = async (req: Request, res: Response) => {
//   try {
//     const id = req.params.productId;
//     // const filter = { _id: id };
//     // const options = { upsert: true };
//     const updateProduct = req.body;
//     console.log(updateProduct)
//     const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
//       new: true, // returns the updated document
//       runValidators: true // validates the update operation
//   });
//     // const updateNewProduct = {
//     //   $set: {
//     //     name: updateProduct.name,
//     //     description: updateProduct.description,
//     //     price: updateProduct.price,
//     //     category: updateProduct.category,
//     //     tags: updateProduct.ags,
//     //     variants: updateProduct.variants,
//     //     inventory: updateProduct.inventory,
//     //   },
//     // };
//     const property = {
//       updateNewProduct,
//       filter,
//       options,
//     };
//     const result = await productServices.updateProductFromDB(updatedUser);

//     res.status(200).json({
//       success: true,
//       message: 'Product updated successfully!',
//       data: result,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: 'Not updated',
//     });
//   }
// };

const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId;
    const updateData = req.body;

    // Assume Product is your Mongoose model
    // const updatedProduct = await ProductModel.findByIdAndUpdate(
    //   productId,
    //   updateData,
    //   {
    //     new: true, // returns the updated document
    //     runValidators: true, // validates the update operation
    //   },
    // );
    
    const property = {
      updateNewProduct: { _id: productId },
      filter: updateData,
      options: { new: true, runValidators: true },
    };

    const result = await productServices.updateProductFromDB(property);

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Product not updated',
    });
  }
};


//Delete a Product
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


//Search a product
const searchProduct = async (req: Request, res: Response) => {
  try {
    const search = req.query.search;
    console.log("search",search)
    const result = await productServices.searchProductFromDB(search as string);
    res.status(200).json({
      success: true,
      message: `Products matching search term '${search}' fetched successfully!`,
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Product not found',
      error: err,
    });
  }
};

export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  searchProduct
};
