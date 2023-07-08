export interface OutGoingOrderDish {
    dish_id: number | string;
    count: number;
}

export interface OutGoingOrder {
    client_name: string;
    client_id: string;
    address: string;
    email: string;
    order_bill: number;

    dishes: OutGoingOrderDish[];
}