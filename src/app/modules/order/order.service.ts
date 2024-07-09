import { Order } from './order.interface';
import { OrderModel } from './order.model';

const createOrderIntoDB = async (order: Order) => {
  const result = await OrderModel.create(order);

  return result;
};

const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find();

  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSingleOrderFromDB = async (email: any) => {
  const result = await OrderModel.findOne({ email: email });
  return result;
};
export const orderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getSingleOrderFromDB,
};
