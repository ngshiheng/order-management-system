import { IsIn, IsOptional } from 'class-validator';
import { OrderStatus } from '../order-status.enum';

export class GetOrdersFilterDto {
  @IsOptional()
  @IsIn([
    OrderStatus.CREATED,
    OrderStatus.CONFIRMED,
    OrderStatus.DELIVERED,
    OrderStatus.CANCELLED,
  ])
  status: OrderStatus;
}
