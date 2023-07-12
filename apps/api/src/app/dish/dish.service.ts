import { Injectable } from '@nestjs/common';
import { FetchDishFromArray } from '../shared/producer/product.producer';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { DishEntity } from './entities/dish.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DishService {



    constructor(
        private dishProducer: FetchDishFromArray,
        @InjectRepository(DishEntity)
        private readonly dishRepository: Repository<DishEntity>
    ){}

    
    fetchDishes(){

        return this.dishRepository.find();
    }
}
