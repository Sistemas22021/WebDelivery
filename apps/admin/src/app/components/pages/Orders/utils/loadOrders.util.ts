import { OrderStatus } from "../enums/OrderStatus.enum";
import { IncomingFirebaseOrder } from "../interfaces/IncomingFirebaseOrder.interface";
import OrderInterface from "../interfaces/order.interface";
import MapIncomingFbOrder from "../mappers/MapIncomingFbOrder.mapper";
import getOrders from "../querys/getOrders.query";

export default function loadOrders(
    setOrders: React.Dispatch<React.SetStateAction<OrderInterface[]>>,
    setOnLoad: React.Dispatch<React.SetStateAction<boolean>>,
    status?: OrderStatus,
) {
    const load = async () => {
        setOnLoad(true);
        //getOrderFilterUtil(status)
        const firebase_orders: IncomingFirebaseOrder[] = await getOrders();
        const orders = firebase_orders.map(order => MapIncomingFbOrder(order));
        setTimeout(() => {
            setOnLoad(false);
            setOrders(orders);
        }, 2000);
    }

    load();
}