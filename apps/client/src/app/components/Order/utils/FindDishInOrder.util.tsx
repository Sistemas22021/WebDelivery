import { Dish } from "../interfaces/Dish.interface";
import { OrderDish } from "../interfaces/OrderDish.interface";

export default (dish: Dish, current_order: OrderDish[]): number => {

    for (let index = 0; index < current_order.length; index++) {
        if(current_order[index].dish.dish_id === dish.dish_id)
            return index;
    }

    return -1;
}