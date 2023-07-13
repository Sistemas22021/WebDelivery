import { IncomingDish } from "../interfaces/IncomingDish.interface";
import { Dish } from "../interfaces/Dish.interface";

export function MapDish(IncomingDishes: IncomingDish[]): Dish[] {

    return IncomingDishes.map(dish => ({
        dish_id: dish.dish_id,
        name: dish.name,
        description: dish.description,
        real_price: dish.price,
    }));
}