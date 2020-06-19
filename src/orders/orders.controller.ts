import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from './order-status.enum';
import { Order } from './orders.entity';
import { OrdersService } from './orders.service';
import { OrderStatusValidationPipe } from './pipes/order-status-validation.pipe';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/:id')
  getOrderById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.ordersService.getOrderById(id);
  }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Patch('/:id/status')
  updateOrderStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', OrderStatusValidationPipe) status: OrderStatus,
  ): Promise<Order> {
    return this.ordersService.updateOrderStatus(id, status);
  }
}
