import { OrderDish } from "../interfaces/OrderDish.interface";
export default (orderDishes: OrderDish[]): number => {

    return orderDishes.reduce(
        (accumulator, currentValue) => accumulator + (currentValue.quantity * currentValue.dish.real_price),0
    );
}