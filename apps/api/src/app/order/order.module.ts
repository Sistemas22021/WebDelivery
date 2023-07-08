import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { FetchDishFromArray } from '../shared/producer/product.producer';
import { SenderOrderMail } from '../sender/classes/sender-order-email.class';
import { FireormModule } from 'nestjs-fireorm';
import { OrderCollection } from './collections/order.collection';
import { SaveIntoFireStorageListener } from './order-created-listeners/save-firestorage.listener';
import { SaveIntoMySQlListener } from './order-created-listeners/save-mysql.listener';
import { SendEmailListener } from './order-created-listeners/send-email.listener';

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
    SaveIntoMySQlListener,
    SendEmailListener
  ],
  imports: [FireormModule.forFeature([OrderCollection])]
})
export class OrderModule {}
