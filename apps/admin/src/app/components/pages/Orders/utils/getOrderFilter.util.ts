import { OrderStatus } from "../enums/OrderStatus.enum";

export default (status: OrderStatus): string => {
    switch(status) {
        case OrderStatus.PENDING: return 'PENDING';
        default: return 'ON_PROGRESS';
    }
}