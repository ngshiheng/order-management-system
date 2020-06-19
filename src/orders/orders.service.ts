import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './order-status.enum';
import { Order } from './orders.entity';
import { OrderRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
  ) {}

  async getOrderById(id: number): Promise<Order> {
    const found = await this.orderRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Order ID "${id}" not found!`);
    }
    return found;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderRepository.createOrder(createOrderDto);
  }

  async updateOrderStatus(id: number, status: OrderStatus): Promise<Order> {
    const order = await this.getOrderById(id);
    order.status = status;
    order.save();
    return order;
  }

  async deleteOrder(id: number): Promise<void> {
    const result = await this.orderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Order ID "${id}" not found!`);
    }
  }
}
