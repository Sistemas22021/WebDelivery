import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { FetchDishFromArray } from '../shared/producer/product.producer';
import { SenderOrderMail } from '../sender/classes/sender-order-email.class';
import { FireormModule } from 'nestjs-fireorm';
import { OrderCollection } from './collections/order.collection';
import { SaveIntoFireStorageListener } from './order-created-listeners/save-firestorage.listener';
import { SendEmailListener } from './order-created-listeners/send-email.listener';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { OrderEntity } from './entities/order.entity';
import { ClientEntity } from './entities/client.entity';
import { OrderDishEntity } from './entities/order_dish.entity';
import { DishEntity } from '../dish/entities/dish.entity';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    FetchDishFromArray,
    {
      provide: 'SenderOrder',
      useClass: SenderOrderMail,
    
    },
    SaveIntoFireStorageListener,
    SendEmailListener
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
