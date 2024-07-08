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

//Retrieve Orders by User Email
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email;

    let result;
    if (email) {
      result = await orderServices.getSingleOrderFromDB(email); // Find orders by email

      return res.status(200).json({
        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result,
      });
    } else {
      result = await orderServices.getAllOrdersFromDB(); // Find all orders

      return res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err:any) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message,
    });
  }
};

export const orderControllers = {
  createOrder,
  getAllOrders,
};
