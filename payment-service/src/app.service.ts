import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { sample } from 'lodash';
import { OrderStatus } from './order-status.enum';

@Injectable()
export class AppService {
  private logger = new Logger('PaymentService');

  async processOrderPayment({
    orderId,
    userId,
  }: {
    orderId: number;
    userId: number;
  }): Promise<void> {
    this.logger.debug(`Updating orderId=${orderId} for userId="${userId}"`);
    const order = await axios.patch(
      `http://localhost:3000/orders/${orderId}/status`,
      {
        status: sample([OrderStatus.DECLINED, OrderStatus.CONFIRMED]),
      },
    );

    if (order.data.status === OrderStatus.CONFIRMED) {
      this.logger.debug(`orderId=${orderId} is CONFIRMED`);
      setTimeout(async () => {
        await axios.patch(`http://localhost:3000/orders/${orderId}/status`, {
          status: OrderStatus.DELIVERED,
        });
        this.logger.debug(`orderId=${orderId} is set to DELIVERED state`);
      }, 5000);
    } else if (order.data.status === OrderStatus.DECLINED) {
      this.logger.debug(
        `orderId=${orderId} is DECLINED, moving order to CANCELLED state`,
      );
      setTimeout(async () => {
        await axios.patch(`http://localhost:3000/orders/${orderId}/status`, {
          status: OrderStatus.CANCELLED,
        });
        this.logger.debug(`orderId=${orderId} is set to CANCELLED state`);
      }, 5000);
    }
  }
}
