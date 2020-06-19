import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderRepository])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
