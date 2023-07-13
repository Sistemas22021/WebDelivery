import { OrderStatus } from "../enums/OrderStatus.enum";

export default (status: OrderStatus): string => {

    switch(status){
        case OrderStatus.COMPLETED: return `Esta seguro que desea completar la orden?`;
        case OrderStatus.ON_PROGRESS: return `Esta seguro que desea atender la orden?`;
        case OrderStatus.CANCELLED: return `Esta seguro que desea cancelar la orden?`;
        default: return '';
    }
}