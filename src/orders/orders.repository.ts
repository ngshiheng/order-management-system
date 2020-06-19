import { EntityRepository, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './order-status.enum';
import { Order } from './orders.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { price, quantity } = createOrderDto;
    const order = new Order();
    order.price = price;
    order.quantity = quantity;
    order.status = OrderStatus.CREATED;
    await order.save();
    return order;
  }
}
