import { DishI } from "../../../interfaces/Dish.interface";
import { OrderDishI } from "../../../interfaces/OrderDish.interface";

export default (dish: DishI, current_order: OrderDishI[]): number => {

    for (let index = 0; index < current_order.length; index++) {
        if(current_order[index].dish.dish_id === dish.dish_id)
            return index;
    }

    return -1;
}