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
    const searchTerm = req.query.searchTerm as string;
    let products;

    if (searchTerm) {
      products = await productServices.searchProductFromDB(searchTerm);
    } else {
      products = await productServices.getAllProductsFromDB();
    }

    res.status(200).json({
      success: true,
      message: `Products ${searchTerm} fetched successfully!`,
      data: products
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
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



const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.productId;
    const filter = { _id: id };
    const options = { upsert: true }; // No need for strict: false here
    const updateProduct = req.body;
    console.log("🚀 ~ updateProduct ~ updateProduct:", updateProduct);
    
    const updateNewProduct = {
      $set: {
        name: updateProduct.name,
        description: updateProduct.description,
        price: updateProduct.price,
        category: updateProduct.category,
        tags: updateProduct.tags,  // Corrected from ags to tags
        variants: updateProduct.variants,
        inventory: updateProduct.inventory,
        // isDeleted: updateProduct.isDeleted // Added to match schema
      },
    };

    const result = await productServices.updateProductFromDB(filter, updateNewProduct, options);
    console.log("🚀 ~ updateProduct ~ result:", result)
   

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    });
  } catch (err) {
    console.log("🚀 ~ updateProduct ~ err:", err);
    res.status(500).json({
      success: false,
      message: 'Not updated',
    });
  }
};
//Search a product
// const searchProduct = async (req: Request, res: Response) => {
//   try {
//     const search = req.query;
//     console.log("search = ",search)
//     // let result
    // if(search){
    //    result = await productServices.searchProductFromDB(search as string);
    //   res.status(200).json({
    //     success: true,
    //     message: `Products matching search term '${search}' fetched successfully!`,
    //     data: result,
    //   });

    // }else{
    //   const id = req.params.productId;
    //    result = await productServices.getSingleProductFromDB(id);
    //   res.status(200).json({
    //     success: true,
    //     message: 'Products fetched successfully!',
    //     data: result,
    //   });
    // }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message || 'Product not found',
//       error: err,
//     });
//   }
// };

export const productControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  // searchProduct
};
