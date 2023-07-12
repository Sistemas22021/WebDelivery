import { Client } from "../../shared/interfaces/client.interface";
import { ReceivedOrderDto } from "../dto/received-order.dto";
import { ClientEntity } from "../entities/client.entity";

export function MapClientFromOrder(dto: ReceivedOrderDto): Client {
    return {
        name: dto.client_name,
        address: dto.address,
        email: dto.email,
        identification: dto.client_id
    }
}

export function MapClientFromEntity(client: ClientEntity): Client {
    return {
        address: client.address,
        email: client.email,
        identification: client.identification,
        name: client.name
    }
}