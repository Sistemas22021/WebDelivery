import { DishI } from "../../../interfaces/Dish.interface";
import { OrderDishI } from "../../../interfaces/OrderDish.interface";
import FindDishInOrderUtil from "./FindDishInOrder.util";

export default (dish: DishI, currentOrder: OrderDishI[]): OrderDishI[] => {

    console.log(dish)
    const aux = [...currentOrder];
    const index = FindDishInOrderUtil(dish,aux);

    if (index === -1) {
        aux.push({ dish, quantity: 1 });
        return aux;
    }   

    aux[index].quantity+=1;


    return aux;
}