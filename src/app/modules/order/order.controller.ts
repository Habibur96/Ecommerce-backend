import { Request, Response } from 'express';
import { orderServices } from './order.service';
import { OrderValidationSchema } from './order.validation';
import { OrderModel } from './order.model';

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
// const getAllOrders = async (req: Request, res: Response) => {
//   try {
//     const result = await orderServices.getAllOrdersFromDB();

//     res.status(200).json({
//       sucess: true,
//       message: 'Order fetched successfully!',
//       data: result,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed o create product',
//     });
//   }
// };

//Retrieve Orders by User Email
const getAllOrders = async (req:Request, res:Response) => {
  try {
    const email = req.query.email;

    let result;
    if (email) {
      // Find orders by email
       result = await orderServices.getSingleOrderFromDB(email);
      // orders = await OrderModel.find({ email: email });
      return res.status(200).json({

        success: true,
        message: 'Orders fetched successfully for user email!',
        data: result
      });
    } else {
      // Find all orders
       result = await orderServices.getAllOrdersFromDB();
      // orders = await OrderModel.find({});
     return res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
}

// const getOrdersByEmail = async (req: Request, res: Response) => {
//     try {
//       const email = req.query.email;
//       console.log("email = ", email)
//       const result = await orderServices.getSingleOrderFromDB(email);
//       res.status(200).json({
//         success: true,
//         message: 'Orders fetched successfully for user email!',
//         data: result,
//       });
//     } catch (err) {
//       res.status(500).json({
//         success: false,
//         message: 'Order not found',
//       });
//     }
//   };
export const orderControllers = {
  createOrder,
  getAllOrders,
  // getOrdersByEmail,
};
