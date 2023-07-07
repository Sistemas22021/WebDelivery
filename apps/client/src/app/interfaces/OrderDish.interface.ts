import { DishI } from "./Dish.interface";

export interface OrderDishI {
    dish: DishI,
    quantity: number;
}