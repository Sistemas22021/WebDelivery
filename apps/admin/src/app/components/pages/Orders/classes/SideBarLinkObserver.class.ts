import { OrderStatus } from "../enums/OrderStatus.enum";
import OrderInterface from "../interfaces/order.interface";
import FilterOrders from "../utils/filterOrders.util";
import { Observer } from "./OrdersNotifier.class";



//Observador que actualizara el contador de ordenes segun sea el tipo.
export class SidebarLinkObserver implements Observer{


    private order_status: OrderStatus;
    private setCount: React.Dispatch<React.SetStateAction<number>>;
    public id: string;
    constructor(
        order_status: OrderStatus,
        setCount: React.Dispatch<React.SetStateAction<number>>,
        id: string
    ) {
        this.order_status = order_status;
        this.setCount = setCount;
        this.id = id;
    }

    update(orders: OrderInterface[]): void {
        const filtered_orders = FilterOrders(orders,this.order_status);
        this.setCount(filtered_orders.length);
    }
}