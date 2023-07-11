import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DishModule } from './dish/dish.module';
import { OrderModule } from './order/order.module';
import appConfig from './config/app.config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { FireormModule } from 'nestjs-fireorm';
import firestoreConfig from './config/firestore.config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { TypeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    DishModule, 
    OrderModule,
    ConfigModule.forRoot( { load: [appConfig] } ), 
    EventEmitterModule.forRoot(),
    FireormModule.forRoot(firestoreConfig()),
    TypeOrmModule.forRootAsync(TypeOrmConfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
