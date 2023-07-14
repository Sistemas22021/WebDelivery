import { OrderStatus } from "../enums/OrderStatus.enum";

export default (status: OrderStatus): string => {
    switch(status) {
        case OrderStatus.PENDING: return 'PENDING';
        case OrderStatus.COMPLETED: return 'COMPLETED';
        case OrderStatus.CANCELLED: return 'CANCELLED'
        case OrderStatus.ON_PROGRESS: return 'ON_PROGRESS'
    }
}