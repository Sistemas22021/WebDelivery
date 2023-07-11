import { Client } from "../../shared/interfaces/client.interface";
import { ReceivedOrderDto } from "../dto/received-order.dto";

export function MapClientFromOrder(dto: ReceivedOrderDto): Client {
    return {
        name: dto.client_name,
        address: dto.address,
        email: dto.email,
        identification: dto.client_id
    }
}