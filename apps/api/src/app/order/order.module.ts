import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { FetchDishFromArray } from '../shared/producer/product.producer';
import { SenderOrderMail } from '../sender/classes/sender-order-email.class';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    FetchDishFromArray,
    {
      provide: 'SenderOrder',
      useClass: SenderOrderMail,
    
    }
  ]
})
export class OrderModule {}
