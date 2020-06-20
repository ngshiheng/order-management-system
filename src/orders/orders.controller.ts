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
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
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
    @GetUser() user: User,
  ): Promise<Order[]> {
    return this.ordersService.getOrders(filterDto, user);
  }

  @Get('/:id')
  getOrderById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Order> {
    return this.ordersService.getOrderById(id, user);
  }

  @Post()
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: User,
  ): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto, user);
  }

  @Patch('/:id/status')
  updateOrderStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', OrderStatusValidationPipe) status: OrderStatus,
    @GetUser() user: User,
  ): Promise<Order> {
    return this.ordersService.updateOrderStatus(id, status, user);
  }

  @Delete('/:id')
  deleteOrder(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.ordersService.deleteOrder(id, user);
  }
}
