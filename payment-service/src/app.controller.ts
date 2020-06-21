import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ type: 'create-order-payment' })
  processOrderPayment(
    @Payload() data: { orderId: number; userId: number },
  ): void {
    this.appService.processOrderPayment(data);
  }
}
