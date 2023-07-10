import { OrderStatus } from "../enums/OrderStatus.enum";
import OrderInterface from "../interfaces/order.interface";
import { Observer } from "./OrdersNotifier.class";



//Observador que actualizara las ordenes que vayan entrando.
export class OrderObserver implements Observer {
    
    private setOrders: React.Dispatch<React.SetStateAction<OrderInterface[]>>;
    private order_status: OrderStatus;

    public id: string;
    constructor(
        order_status: OrderStatus,
        setOrders: React.Dispatch<React.SetStateAction<OrderInterface[]>>,
        id: string
    ) {
        this.setOrders = setOrders;
        this.order_status = order_status;
        this.id = id;
    }

    update(orders: OrderInterface[]): void {

        this.setOrders(orders);
    }
}