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
    return orderDishes.map(order_dish => {
        
        let dish_id: string | number;
        
        if (Number.isNaN(Number.parseInt(order_dish.dish.dish_id)))
            dish_id = String(order_dish.dish.dish_id)
        else 
            dish_id = Number(order_dish.dish.dish_id)

        return { dish_id , count: order_dish.quantity}
    });
}