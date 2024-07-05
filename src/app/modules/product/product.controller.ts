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
    console.log(err);
    // res.status(500).json({
    //   success: false,
    //   message: err.message || 'something went wrong',
    //   error: err,
    // });
  }
};

export const productControllers = {
  createProduct,
};
