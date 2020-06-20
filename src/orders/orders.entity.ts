import { User } from 'src/auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatus } from './order-status.enum';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  status: OrderStatus;

  @ManyToOne(
    type => User,
    user => user.orders,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;
}
