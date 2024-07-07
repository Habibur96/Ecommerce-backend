import { Request, Response } from 'express';
import { orderServices } from './order.service';
import { OrderValidationSchema } from './order.validation';

//create Order
const createOrder = async (req: Request, res: Response) => {
  try {
    const  {order:orderData} = req.body;
    // console.log({order})
    const zodparseData = OrderValidationSchema.parse(orderData);
    const result = await orderServices.createOrderIntoDB(
      zodparseData,
    );
    console.log("Result = ",result)
    res.status(200).json({
      sucess: true,
      message: 'Order created successfully!',
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
    createOrder
}