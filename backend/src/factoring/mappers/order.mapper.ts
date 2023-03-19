import { plainToClass } from 'class-transformer';
import { OrderEntity } from 'src/factoring/entities';
import { OrderModel } from 'src/factoring/models';

export function mapOrderToModel(orderEntity: OrderEntity): OrderModel {
  const orderModel = plainToClass(OrderModel, orderEntity);
  return orderModel;
}
