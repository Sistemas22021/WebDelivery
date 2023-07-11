import { Order } from "../classes/order.class";
import { OrderEntity } from "../entities/order.entity";
import { Repository } from "typeorm";
import { OrderDishEntity } from "../entities/order_dish.entity";
import { OrderDish } from "../classes/order-dish.class";
import { DishEntity } from "../../dish/entities/dish.entity";
import { Client } from "../../shared/interfaces/client.interface";
import { ClientEntity } from "../entities/client.entity";
interface SaveOrderParams {
    order: Order,
    orderRepository: Repository<OrderEntity>,
    orderDishRepository: Repository<OrderDishEntity>
}


export function MapDishEntityFromOrderDish(order_dish: OrderDish): DishEntity {
    const dish = new DishEntity();

    dish.name = order_dish.getName();
    dish.description = order_dish.getDescription();
    dish.price = order_dish.getRealPrice();
    dish.dish_id = parseInt(order_dish.getId());

    return dish;
}

export function MapOrderDishEntity(order: OrderEntity, order_dish: OrderDish): OrderDishEntity {
    const new_order_dish = new OrderDishEntity();

    new_order_dish.current_price = order_dish.getCurrentPrice();
    new_order_dish.quantity = order_dish.getQuantitiy();

    new_order_dish.dish = MapDishEntityFromOrderDish(order_dish);
    new_order_dish.order = order;

    return new_order_dish;

}

export function MapOrderDishEntities(order: OrderEntity, order_dishes: OrderDish[] ) {
    return order_dishes.map(order_dish => MapOrderDishEntity(order, order_dish));
}


export function MapOrderClient(client: Client): ClientEntity {
    const entity = new ClientEntity();
    entity.name = client.name;
    entity.address = client.address;
    entity.email = client.email;
    entity.identification = client.identification;

    return entity;
}

export async function SaveOrderIntoMysql(params: SaveOrderParams): Promise<boolean> {


    const new_order = new OrderEntity();

    new_order.client = MapOrderClient(params.order.getClient());
    new_order.bill = params.order.getBill();
    new_order.generated_at = params.order.getDate().toISOString();
    new_order.id = params.order.getId();
    new_order.status = params.order.getStatus();


    const order_dishes = MapOrderDishEntities(new_order,params.order.getDishes());

    try {
        await params.orderRepository.save(new_order);
        await params.orderDishRepository.save(order_dishes);
        return true;
    } catch (error) {
        return false;
    }

}