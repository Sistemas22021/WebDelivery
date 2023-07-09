import { OrderStatus } from "../enums/OrderStatus.enum";
import { IncomingFirebaseDish, IncomingFirebaseOrder } from "../interfaces/IncomingFirebaseOrder.interface";
import Dish from "../interfaces/dish.interface";
import OrderInterface, { OrderDish } from "../interfaces/order.interface";


export function MapIncomingDish(dish: IncomingFirebaseDish): Dish {
    return {
        description: '',
        name: '',
        price: dish.current_price
    }
}
export function MapIncomingDishes(dishes: IncomingFirebaseDish[]): OrderDish[] {
    return dishes.map(dish => ({
        dish: MapIncomingDish(dish),
        quantity: dish.quantity
    }));
}

export function MapOrderStatus(status: string): OrderStatus {
    return status === 'PENDING' ? OrderStatus.PENDING : OrderStatus.ON_PROGRESS;
}

export default function MapIncomingFbOrder(order: IncomingFirebaseOrder): OrderInterface {
    return {
        client: order.client,
        created_at: order.generated_at,
        dishes: MapIncomingDishes(order.dishes),
        id: order.id,
        order_bill: order.order_bill,
        status: MapOrderStatus(order.status)
    }
}
