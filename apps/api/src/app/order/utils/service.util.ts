import { Repository } from "typeorm";
import { DishInterface } from "../../dish/interfaces/dish.interface";

import { OrderDishDto } from "../dto/order-dish.dto";
import { ClientEntity } from "../entities/client.entity";



export function checkIfDishesExists(current: OrderDishDto[], dishes: DishInterface[]): boolean {
    
    for(const dish_dto of current) {
        const result = dishes.find(dish => String(dish.dish_id) === String(dish_dto.dish_id));

        if (!result) return false;
    }
    return true;
} 

export async function getOrUndefinedClient(repository: Repository<ClientEntity>, identification: string): Promise<ClientEntity | null> {

    return await repository.findOneBy({identification});
}

