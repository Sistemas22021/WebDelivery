import { OrderDishI } from "../../../interfaces/OrderDish.interface";

export default (orderDishes: OrderDishI[]): number => {

    return orderDishes.reduce(
        (accumulator, currentValue) => accumulator + (currentValue.quantity * currentValue.dish.real_price),0
    );
}