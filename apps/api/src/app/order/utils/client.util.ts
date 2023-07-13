import { Repository } from "typeorm";
import { Client } from "../../shared/interfaces/client.interface";
import { ClientEntity } from "../entities/client.entity";

export async function saveOrUpdateClient(repository: Repository<ClientEntity>, new_client: Client): Promise<ClientEntity | null> {
    try {
        return await repository.save(new_client);
    } catch (error) {
        return null;
    }
}

export function checkIfClientHasChange(previous_client: Client ,current_client: Client): boolean {

    if (!(previous_client.name === current_client.name))
        return true;
    if(!(previous_client.address === current_client.address))
        return true;
    if(!(previous_client.email === current_client.email))
        return true;

    return false;
}