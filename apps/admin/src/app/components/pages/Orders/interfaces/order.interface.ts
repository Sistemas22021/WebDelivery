import { OrderStatus } from "../enums/OrderStatus.enum";
import Client from "./client.interface";
import Dish from "./dish.interface";

export interface OrderDish {
    dish: Dish;
    quantity: number;
}

export default interface OrderInterface {
    id: string
    client: Client;
    order_bill: number;
    dishes: OrderDish[];
    status: OrderStatus;
    created_at: string;
}