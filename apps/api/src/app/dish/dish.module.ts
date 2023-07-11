import { Module } from '@nestjs/common';
import { DishController } from './dish.controller';
import { DishService } from './dish.service';
import { FetchDishFromArray } from '../shared/producer/product.producer';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { DishEntity } from './entities/dish.entity';

@Module({
  controllers: [DishController],
  providers: [DishService,FetchDishFromArray],
  imports: [TypeOrmModule.forFeature([DishEntity])]
})
export class DishModule {}
