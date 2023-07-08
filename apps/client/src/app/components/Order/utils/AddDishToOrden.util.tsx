import { Dish } from "../interfaces/Dish.interface";
import { OrderDish } from "../interfaces/OrderDish.interface";
import FindDishInOrderUtil from "./FindDishInOrder.util";

export default function addDishToOrder(dish: Dish, currentOrder: OrderDish[]): OrderDish[] {

    const aux = [...currentOrder];
    const index = FindDishInOrderUtil(dish,aux);

    if (index === -1) {
        aux.push({ dish, quantity: 1 });
        return aux;
    }   

    aux[index].quantity+=1;


    return aux;
}