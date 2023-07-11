import {Injectable, InternalServerErrorException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { ReceivedOrderDto } from './dto/received-order.dto';
import { FetchDishFromArray } from '../shared/producer/product.producer';
import { checkIfDishesExists, getOrUndefinedClient } from './utils/service.util';
import { MapOrder, MapOrderDishElements } from './mappers/order.mapper';
import { OrderDish } from './classes/order-dish.class';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { DishEntity } from '../dish/entities/dish.entity';
import { Repository } from 'typeorm';
import { ClientEntity } from './entities/client.entity';
import { checkIfClientHasChange, saveOrUpdateClient } from './utils/client.util';
import { MapClientFromOrder } from './mappers/client.mapper';
import { OrderDishEntity } from './entities/order_dish.entity';
import { SaveOrderIntoMysql } from './utils/order.util';
import { OrderEntity } from './entities/order.entity';
import { MapDishes } from './mappers/dishes.mapper';

@Injectable()
export class OrderService {


    constructor(
        private dishProducer: FetchDishFromArray,
        @InjectRepository(DishEntity)
        private readonly dishRepository: Repository<DishEntity>,
        @InjectRepository(ClientEntity)
        private readonly clientRepository: Repository<ClientEntity>,
        @InjectRepository(OrderDishEntity)
        private readonly orderDishRepository: Repository<OrderDishEntity>,
        @InjectRepository(OrderEntity)
        private readonly orderRepository: Repository<OrderEntity>,
        private eventEmitter: EventEmitter2

    ) {}

    async createOrder(orderDto: ReceivedOrderDto){

        const dishes_array = MapDishes(await this.dishRepository.find());
        const current_client = await getOrUndefinedClient(this.clientRepository, orderDto.client_id);
        const received_client = MapClientFromOrder(orderDto);

        if (!checkIfDishesExists(orderDto.dishes, dishes_array)) throw new NotFoundException();



        if (!current_client)
            await saveOrUpdateClient(this.clientRepository, received_client);
        if (current_client){
            const client_has_changed = checkIfClientHasChange(current_client,received_client);
            if (client_has_changed) saveOrUpdateClient(this.clientRepository, received_client);
        }

        
        const dishes: OrderDish[] = MapOrderDishElements(orderDto.dishes, dishes_array);
        const order = MapOrder(orderDto, dishes);

        //await this.senderOrder.sendOrder(MapOrderToEmailData(order));
        if (order.getBill() !== orderDto.order_bill) throw new UnprocessableEntityException();

        const params = { 
            order,
            orderDishRepository: this.orderDishRepository, 
            orderRepository: this.orderRepository 
        }
        
        if (!(await SaveOrderIntoMysql(params))) throw new InternalServerErrorException();


        this.eventEmitter.emit('order.created',order);

        return "Enviado exitosamente!";
    }

}
