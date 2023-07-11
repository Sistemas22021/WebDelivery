import { DishEntity } from "../../dish/entities/dish.entity";
import { DishInterface } from "../../dish/interfaces/dish.interface";

export function MapDishes(dishes: DishEntity[]): DishInterface[] {

    return dishes.map(dish => ({
        dish_id: String(dish.dish_id),
        description: dish.description,
        name: dish.name,
        price: dish.price
    }))
}