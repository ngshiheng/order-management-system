import { BadRequestException, PipeTransform } from '@nestjs/common';
import { OrderStatus } from '../order-status.enum';

export class OrderStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    OrderStatus.CREATED,
    OrderStatus.CONFIRMED,
    OrderStatus.CANCELLED,
    OrderStatus.DELIVERED,
  ];

  transform(value: string): string {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
