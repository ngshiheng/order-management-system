import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  quantity: number;
}
