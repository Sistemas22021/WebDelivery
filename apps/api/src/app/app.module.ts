import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DishModule } from './dish/dish.module';
import { OrderModule } from './order/order.module';
import appConfig from './config/app.config';

@Module({
  imports: [DishModule, OrderModule,ConfigModule.forRoot( { load: [appConfig] } )],
  controllers: [],
  providers: [],
})
export class AppModule {}
