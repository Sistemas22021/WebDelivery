import { OrderData } from "../../interfaces/order-data.interface";

export function OrderDataFixture(): OrderData {
    return { 
        client_name: 'Jesus Figuera',
        client_id: '29660012',
        client_email: 'jesusfiguera20@gmail.com',
        client_address: 'la asuncion',
        order_bill: 50,
        order: 'Detalles de pedido'
    }    
}