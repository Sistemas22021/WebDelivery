import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DishModule } from './dish/dish.module';
import { OrderModule } from './order/order.module';
import appConfig from './config/app.config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FireormModule } from 'nestjs-fireorm';
import firestoreConfig from './config/firestore.config';

@Module({
  imports: [
    DishModule, 
    OrderModule,
    ConfigModule.forRoot( { load: [appConfig] } ), 
    EventEmitterModule.forRoot(),
    FireormModule.forRoot(firestoreConfig())
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
