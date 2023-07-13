import { Collection } from "fireorm";
import { Client } from "../../shared/interfaces/client.interface";
import { OrderDishCollectionInterface } from "../interfaces/order-dish.interface";

@Collection('order')
export class OrderCollection {

    id: string;
    generated_at: string;
    status: string;
    order_bill: number;
    client: Client;
    dishes: OrderDishCollectionInterface[];    
}