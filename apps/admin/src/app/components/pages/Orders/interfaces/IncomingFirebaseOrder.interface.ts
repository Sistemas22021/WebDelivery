
export interface IncomingFirebaseClient {
    address: string;
    email: string;
    identification: string;
    name: string;
}

export interface IncomingFirebaseDish {
    current_price: number;
    dish_bill: number;
    dish_id: string;
    dish_name?: string;
    dish_description?: string;
    quantity: number;
}

export interface IncomingFirebaseOrder {
    client: IncomingFirebaseClient;
    dishes: IncomingFirebaseDish[],
    generated_at: string;
    id: string;
    order_bill: number;
    status: string;
}