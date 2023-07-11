import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { FetchDishFromArray } from '../shared/producer/product.producer';
import { SenderOrderMail } from '../sender/classes/sender-order-email.class';
import { FireormModule } from 'nestjs-fireorm';
import { OrderCollection } from './collections/order.collection';
import { OrderFireStorageListener } from './order-listeners/firestorage.listener';
import { OrderEmailListener } from './order-listeners/email.listener';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { OrderEntity } from './entities/order.entity';
import { ClientEntity } from './entities/client.entity';
import { OrderDishEntity } from './entities/order_dish.entity';
import { DishEntity } from '../dish/entities/dish.entity';
import SenderOrderTelegram from '../sender/classes/sender-order-telegram.class';
import { OrderTelegramListener } from './order-listeners/telegram.listener';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    FetchDishFromArray,
    {
      provide: 'SenderOrderMail',
      useClass: SenderOrderMail,
    },
    {
      provide: 'SenderOrderTelegram',
      useClass: SenderOrderTelegram
    },
    OrderFireStorageListener,
    OrderEmailListener,
    OrderTelegramListener
  ],
  imports: [
    FireormModule.forFeature([OrderCollection]),
    TypeOrmModule.forFeature(
      [OrderEntity,
        ClientEntity,
        OrderDishEntity,
        DishEntity
      ]),
  ]
})
export class OrderModule {}
