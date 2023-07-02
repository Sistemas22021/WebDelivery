import { DishInterface } from "../../dish/interfaces/dish.interface";
import { Client } from "../../shared/interfaces/client.interface";
import { CreateOrderDish, OrderDish } from "../classes/order-dish.class";
import { Order } from "../classes/order.class";
import { OrderDishDto } from "../dto/order-dish.dto";
import { ReceivedOrderDto } from "../dto/received-order.dto";

import { OrderData } from "../../sender/interfaces/order-data.interface";
export function checkIfDishesExists(current: OrderDishDto[], dishes: DishInterface[]): boolean {
    
    for(const dish_dto of current) {
        const result = dishes.find(dish => String(dish.dish_id) === String(dish_dto.dish_id));

        if (!result) return false;
    }


    return true;
    
} 


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

    const client: Client = {
        address: order.address,
        email: order.email,
        identification: order.client_id,
        name: order.client_name
    }
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

