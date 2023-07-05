export interface OutGoingOrderDishI {
    dish_id: number;
    count: number;
}

export interface OutGoingOrderI {
    client_name: string;
    client_id: string;
    address: string;
    email: string;
    order_bill: number;

    dishes: OutGoingOrderDishI[];
}