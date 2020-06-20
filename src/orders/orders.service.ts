import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersFilterDto } from './dto/get-orders-filter.dto';
import { OrderStatus } from './order-status.enum';
import { Order } from './orders.entity';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
  ) {}

  getOrders(filterDto: GetOrdersFilterDto, user: User): Promise<Order[]> {
    return this.orderRepository.getOrders(filterDto, user);
  }

  async getOrderById(id: number, user: User): Promise<Order> {
    const found = await this.orderRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException(`Order ID "${id}" not found!`);
    }
    return found;
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    user: User,
  ): Promise<Order> {
    return this.orderRepository.createOrder(createOrderDto, user);
  }

  async updateOrderStatus(
    id: number,
    status: OrderStatus,
    user: User,
  ): Promise<Order> {
    const order = await this.getOrderById(id, user);
    order.status = status;
    order.save();
    return order;
  }

  async deleteOrder(id: number, user: User): Promise<void> {
    const result = await this.orderRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Order ID "${id}" not found!`);
    }
  }
}
