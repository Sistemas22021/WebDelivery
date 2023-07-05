import { IncomingDishI } from "../interfaces/IncomingDish.interface";
import { DishI } from "../interfaces/Dish.interface";

export function MapDish(IncomingDishes: IncomingDishI[]): DishI[] {

    return IncomingDishes.map(dish => ({
        dish_id: dish.dish_id,
        name: dish.name,
        description: dish.description,
        real_price: dish.price,
    }));
}