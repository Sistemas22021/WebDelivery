import { Dish } from "./Dish.interface";

export interface OrderDish {
    dish: Dish,
    quantity: number;
}