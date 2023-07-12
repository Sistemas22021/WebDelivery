import { OrderDish } from "../interfaces/OrderDish.interface";
import { OutGoingOrderDish, OutGoingOrder } from "../interfaces/OutgoingOrder.interface";
import CalculateOrderBillUtil from "../utils/CalculateOrderBill.util";
import getFormField from "../utils/getFormField.util";





export default (form: FormData, orderDishes: OrderDish[]): OutGoingOrder => {
    

    return {
        client_name: getFormField(form,'name'),
        client_id: getFormField(form,'identification'),
        address: getFormField(form,'address'),
        email: getFormField(form,'email'),
        dishes: MapOutgoingOrderDish(orderDishes),
        order_bill: CalculateOrderBillUtil(orderDishes)
    }
    
}


function MapOutgoingOrderDish(orderDishes: OrderDish[]): OutGoingOrderDish[] {
    return orderDishes.map(order_dish => {
        
        let dish_id: string | number;
        
        if (Number.isNaN(Number.parseInt(order_dish.dish.dish_id)))
            dish_id = String(order_dish.dish.dish_id)
        else 
            dish_id = Number(order_dish.dish.dish_id)

        return { dish_id , count: order_dish.quantity}
    });
}