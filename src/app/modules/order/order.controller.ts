import { Request, Response } from 'express';
import { orderServices } from './order.service';
import { OrderValidationSchema } from './order.validation';

//create Order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;

    const zodparseData = OrderValidationSchema.parse(orderData);
    const result = await orderServices.createOrderIntoDB(zodparseData);

    res.status(200).json({
      sucess: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to order create',
    });
  }
};

// Retrieve All Orders
const getAllOrders = async (req: Request, res: Response) => {
    try {
   
      const result = await orderServices.getAllOrdersFromDB();
  
      res.status(200).json({
        sucess: true,
        message: 'Order fetched successfully!',
        data: result,
      });

    } catch (err) {
      res.status(500).json({
        success: false,
        message: 'Failed o create product',
      });
    }
  };

export const orderControllers = {
  createOrder,
  getAllOrders
};
