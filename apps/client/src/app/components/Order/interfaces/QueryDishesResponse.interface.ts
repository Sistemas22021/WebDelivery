import { Dish } from "./Dish.interface";

export interface QueryDishesResponse { 
    message: string;
    items: Dish[];
}