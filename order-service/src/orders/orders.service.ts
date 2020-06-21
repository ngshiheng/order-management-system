import { Injectable, NotFoundException } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersFilterDto } from './dto/get-orders-filter.dto';
import { OrderStatus } from './order-status.enum';
import { Order } from './orders.entity';
import { OrderRepository } from './orders.repository';

const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

@Injectable()
export class OrdersService {
  client: ClientProxy;

  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
  ) {
    this.client = ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
      },
    });
  }

  async getOrders(filterDto: GetOrdersFilterDto, user: User): Promise<Order[]> {
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
    const order = await this.orderRepository.createOrder(createOrderDto, user);
    await this.client
      .send(
        { type: 'create-order-payment' },
        { orderId: order.id, userId: order.userId },
      )
      .toPromise();
    return order;
  }

  async updateOrderStatus(id: number, status: OrderStatus): Promise<Order> {
    const order = await this.orderRepository.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order ID "${id}" not found!`);
    }
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
