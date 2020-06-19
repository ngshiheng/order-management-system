import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersFilterDto } from './dto/get-orders-filter.dto';
import { OrderStatus } from './order-status.enum';
import { Order } from './orders.entity';
import { OrdersService } from './orders.service';
import { OrderStatusValidationPipe } from './pipes/order-status-validation.pipe';

@Controller('orders')
@UseGuards(AuthGuard())
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  getOrders(
    @Query(ValidationPipe) filterDto: GetOrdersFilterDto,
  ): Promise<Order[]> {
    return this.ordersService.getOrders(filterDto);
  }

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

  @Delete('/:id')
  deleteOrder(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.ordersService.deleteOrder(id);
  }
}
