import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DishModule } from './dish/dish.module';
import { OrderModule } from './order/order.module';
import appConfig from './config/app.config';

@Module({
  imports: [DishModule, OrderModule,ConfigModule.forRoot( { load: [appConfig] } )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
