import {Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ReceivedOrderDto } from './dto/received-order.dto';
import { FetchDishFromArray } from '../shared/producer/product.producer';
import { MapOrder, MapOrderDishElements, checkIfDishesExists } from './utils/service.util';
import { OrderDish } from './classes/order-dish.class';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class OrderService {


    constructor(
        private dishProducer: FetchDishFromArray,
       
        private eventEmitter: EventEmitter2

    ) {}

    async createOrder(orderDto: ReceivedOrderDto){

        const dishes_array = this.dishProducer.fetch();


        if (!checkIfDishesExists(orderDto.dishes, dishes_array)) throw new NotFoundException();

        
        const dishes: OrderDish[] = MapOrderDishElements(orderDto.dishes, dishes_array);
        const order = MapOrder(orderDto, dishes);

        //await this.senderOrder.sendOrder(MapOrderToEmailData(order));
        if (order.getBill() !== orderDto.order_bill) throw new UnprocessableEntityException();

        this.eventEmitter.emit('order.created',order);

        return "Enviado exitosamente!";
    }

}
