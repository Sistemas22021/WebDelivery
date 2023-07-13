import { OrderStatus } from "../enums/OrderStatus.enum";
import OrderInterface from "../interfaces/order.interface";

export default function FilterOrders(orders: OrderInterface[], filter: OrderStatus) {
    return orders.filter(order => order.status === filter);
}