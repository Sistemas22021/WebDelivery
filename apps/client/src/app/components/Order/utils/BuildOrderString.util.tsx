import { OrderDishI } from "../../../interfaces/OrderDish.interface";


function buildString(orderDish: OrderDishI, sub_total: number): string {

    return `${orderDish.dish.name} ${Number(orderDish.dish.real_price).toFixed(2)} $ x ${orderDish.quantity} : ${Number(sub_total).toFixed(2)}\n`
}

export default (orderDishes: OrderDishI[]): string => {

    let order_string = "";
    let bill = 0;

    for(const dish of orderDishes) {

        const sub_total = dish.dish.real_price * dish.quantity;
        const dish_str = buildString(dish, sub_total);
        bill+=sub_total;
        order_string = order_string.concat(dish_str);
    }

    order_string = order_string.concat("---------------------------------------------------------------------\n");
    order_string = order_string.concat(`Total a cancelar: ${Number(bill).toFixed(2)} $`);

    return order_string;

}