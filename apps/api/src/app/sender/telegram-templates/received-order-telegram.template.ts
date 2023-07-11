import { OrderData } from "../interfaces/order-data.interface"

export default (order: OrderData): string => 
`
**** Ha ingresado una nueva orden ****

    Cliente: ${order.client_name}
    Correo: ${order.client_email}
    Direccion: ${order.client_address}
    Cedula: ${order.client_id}
    Total a cancelar: ${order.order_bill}

    --- Platillos ---
    
    ${order.order}

`