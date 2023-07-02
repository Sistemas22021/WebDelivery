import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { FetchDishFromArray } from '../shared/producer/product.producer';
import { SenderOrderMail } from '../sender/classes/sender-order-email.class';
import { OrderCreatedListener } from './listeners/order-created.listener';
import { FireormModule } from 'nestjs-fireorm';
import { OrderCollection } from './collections/order.collection';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    FetchDishFromArray,
    {
      provide: 'SenderOrder',
      useClass: SenderOrderMail,
    
    },
    OrderCreatedListener
  ],
  imports: [FireormModule.forFeature([OrderCollection])]
})
export class OrderModule {}
