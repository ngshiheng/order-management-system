import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersFilterDto } from './dto/get-orders-filter.dto';
import { OrderStatus } from './order-status.enum';
import { Order } from './orders.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  private logger = new Logger('OrderRepository');
  async createOrder(
    createOrderDto: CreateOrderDto,
    user: User,
  ): Promise<Order> {
    const { price, quantity } = createOrderDto;
    const order = new Order();
    order.price = price;
    order.quantity = quantity;
    order.status = OrderStatus.CREATED;
    order.user = user;

    try {
      await order.save();
    } catch (error) {
      this.logger.error(
        `Failed to create order for user "${
          user.username
        }", DTO: ${JSON.stringify(createOrderDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
    delete order.user;
    return order;
  }

  async getOrders(filterDto: GetOrdersFilterDto, user: User): Promise<Order[]> {
    const { status } = filterDto;
    const query = this.createQueryBuilder('order');

    query.where('order.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('order.status = :status', { status });
    }

    try {
      return await query.getMany();
    } catch (error) {
      this.logger.error(
        `Failed to get task for user "${user.username}", DTO: ${JSON.stringify(
          filterDto,
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
