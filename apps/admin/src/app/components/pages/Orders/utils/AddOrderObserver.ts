import { NOTIFIER } from "../classes/OrdersNotifier.class";
import { OrderObserver } from "../classes/OrdersObserver.class";
import { OrderStatus } from "../enums/OrderStatus.enum";
import OrderInterface from "../interfaces/order.interface";

export default function AddOrderObserver(
    order_status: OrderStatus,
    setOrders: React.Dispatch<React.SetStateAction<OrderInterface[]>>,
    previous: React.MutableRefObject<OrderObserver>
) {
    const aux = new OrderObserver(
        order_status,
        setOrders,
        'Contenedor'
    );
    NOTIFIER.detach(previous.current);
    NOTIFIER.attach(aux);
}