import { OrderDishI } from "../../../interfaces/OrderDish.interface";
import { OutGoingOrderDishI, OutGoingOrderI } from "../../../interfaces/OutgoingOrder.interface";
import CalculateOrderBillUtil from "../utils/CalculateOrderBill.util";





export default (form: FormData, orderDishes: OrderDishI[]): OutGoingOrderI => {
    

    return {
        client_name: form.get('name')?.valueOf().toString() || '',
        client_id: form.get('identification')?.valueOf().toString() || '',
        address: form.get('address')?.valueOf().toString() || '',
        email: form.get('email')?.valueOf().toString() || '',
        dishes: MapOutgoingOrderDish(orderDishes),
        order_bill: CalculateOrderBillUtil(orderDishes)
    }
    
}


function MapOutgoingOrderDish(orderDishes: OrderDishI[]): OutGoingOrderDishI[] {
    return orderDishes.map(order_dish => ( { dish_id: Number(order_dish.dish.dish_id) , count: order_dish.quantity} ));
}