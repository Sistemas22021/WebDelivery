import { OrderStatus } from "../enums/OrderStatus.enum";
import axios from "axios";
import { ORDER_ENDPOINT } from "./API_URLS";
import getOrderFilterUtil from "../utils/getOrderFilter.util";
export async function updateOrderStatus(params: { order_id: string, status: OrderStatus }) {

    try {
        const response = await axios.patch(ORDER_ENDPOINT,{
            order_id: params.order_id,
            status: getOrderFilterUtil(params.status)
        });
    
        return response.status
    } catch (error) {
        if (axios.isAxiosError(error) && error.response)
            return error.response.status;
        return 500;
        
    }
}   