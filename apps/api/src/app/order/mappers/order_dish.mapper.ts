import { OrderDish } from "../classes/order-dish.class";
import { OrderDishEntity } from "../entities/order_dish.entity";
import { MapDishFromEntity } from "./dishes.mapper";


export function MapOrderDishFromEntity(order_dish: OrderDishEntity): OrderDish {

    const aux = new OrderDish({
        current_price: order_dish.current_price,
        quantity: order_dish.quantity,
        dish: MapDishFromEntity(order_dish.dish)
    })
    return aux;
}

export function MapOrderDishesFromEntity(order_dishes: OrderDishEntity[]): OrderDish[] {
    return order_dishes.map(order_dish => MapOrderDishFromEntity(order_dish));
}