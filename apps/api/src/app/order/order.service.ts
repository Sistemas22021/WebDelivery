import {Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ReceivedOrderDto } from './dto/received-order.dto';
import { FetchDishFromArray } from '../shared/producer/product.producer';
import { MapOrder, MapOrderDishElements, MapOrderToEmailData, checkIfDishesExists } from './utils/service.util';
import { OrderDish } from './classes/order-dish.class';
import { SenderOrder } from '../sender/interfaces/sender-order.interface';

@Injectable()
export class OrderService {


    constructor(
        private dishProducer: FetchDishFromArray,
        @Inject('SenderOrder')
        private senderOrder: SenderOrder

    ) {}

    async createOrder(orderDto: ReceivedOrderDto){

        const dishes_array = this.dishProducer.fetch();

        if (!checkIfDishesExists(orderDto.dishes, dishes_array)) throw new NotFoundException();
        
        const dishes: OrderDish[] = MapOrderDishElements(orderDto.dishes, dishes_array);
        const order = MapOrder(orderDto, dishes);

        await this.senderOrder.sendOrder(MapOrderToEmailData(order));

        return "Enviado exitosamente!";
    }

}
