import { Dish } from "../interfaces/Dish.interface";
import { OrderDish } from "../interfaces/OrderDish.interface";
import FindDishInOrderUtil from "./FindDishInOrder.util";

export default function removeDishFromOrder (dish: Dish, current_order: OrderDish[]): OrderDish[] {

    let aux = [...current_order];

    const index = FindDishInOrderUtil(dish,aux);

    if (index === -1) return aux;

    aux[index].quantity--;

    if (aux[index].quantity === 0)
        aux = aux.filter(element => element.dish.dish_id !== aux[index].dish.dish_id);


    return aux;
}