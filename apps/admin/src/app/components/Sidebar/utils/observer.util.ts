import { NOTIFIER } from "../../pages/Orders/classes/OrdersNotifier.class";
import { SidebarLinkObserver } from "../../pages/Orders/classes/SideBarLinkObserver.class";
import { OrderStatus } from "../../pages/Orders/enums/OrderStatus.enum";

export function initializeObserver(
    order_status: OrderStatus,
    setCount: React.Dispatch<React.SetStateAction<number>>,
    key: string
) {
    const observer = new SidebarLinkObserver(order_status,setCount,key);
    NOTIFIER.attach(observer);
}