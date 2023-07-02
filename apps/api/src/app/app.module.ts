import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DishModule } from './dish/dish.module';
import { OrderModule } from './order/order.module';
import appConfig from './config/app.config';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    DishModule, 
    OrderModule,
    ConfigModule.forRoot( { load: [appConfig] } ), 
    EventEmitterModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
