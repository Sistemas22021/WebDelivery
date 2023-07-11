import { OrderDish } from "../classes/order-dish.class";
import { OrderDishDto } from "../dto/order-dish.dto";
import { DishInterface } from "../../dish/interfaces/dish.interface";
import { CreateOrderDish } from "../classes/order-dish.class";
import { ReceivedOrderDto } from "../dto/received-order.dto";
import { Order } from "../classes/order.class";
import { Client } from "../../shared/interfaces/client.interface";
import { OrderData } from "../../sender/interfaces/order-data.interface";
import { OrderDishCollectionInterface } from "../interfaces/order-dish.interface";
import { OrderCollection } from "../collections/order.collection";
import { MapClientFromOrder } from "./client.mapper";
export function MapOrderDish(current: OrderDishDto, dish: DishInterface): OrderDish {
    
    const aux: CreateOrderDish = {
        quantity: current.count,
        current_price: dish.price,
        dish: dish
    }
    return new OrderDish(aux);
}

export function MapOrderDishElements(current: OrderDishDto[], dish: DishInterface[]): OrderDish[] {

    return current.map(element => {
        const aux_dish = dish.find(aux => String(aux.dish_id) === String(element.dish_id));
        return MapOrderDish(element, aux_dish);
    })

}

export function MapOrder(order: ReceivedOrderDto, dishes: OrderDish[]): Order {

    const client: Client = MapClientFromOrder(order);
    return new Order({ client, dishes})

}

export function MapOrderToEmailData(order: Order): OrderData {
    
    const string_order = order.getDishes().map(dish => `${dish.getName()}: ${dish.getCurrentPrice()} - x${dish.getQuantitiy()}\n`);
    return {
        client_address: order.getClient().address,
        client_email: order.getClient().email,
        client_id: order.getClient().identification,
        client_name: order.getClient().name,
        order_bill: order.getBill(),
        order: string_order.join("")
    };
}


export function MapOrderDishCollection(dish: OrderDish): OrderDishCollectionInterface {

    return {
        current_price: dish.getCurrentPrice(),
        dish_bill: dish.getDishBill(),
        dish_id: dish.getId(),
        quantity: dish.getQuantitiy()
    }
}
export function MapOrderCollection(order: Order): OrderCollection {
    return {
        id: order.getId(),
        client: order.getClient(),
        generated_at: order.getDate().toISOString(),
        status: order.getStatus(),
        order_bill: order.getBill(),
        dishes: order.getDishes().map(dish => MapOrderDishCollection(dish))
    }
}
