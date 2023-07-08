import axios from "axios";
import { MapDish } from "../mappers/DishMapper";
import { QueryDishesResponse } from "../interfaces/QueryDishesResponse.interface";
import { Dish } from "../interfaces/Dish.interface";
import GetDishQueryResponseUtil from "../utils/GetDishQueryResponse.util";
import { DISH_ENDPOINT} from "./path_urls/path_urls";


export async function getDishes(): Promise<QueryDishesResponse> {

    let status: number;
    let items: Dish[];
    try {
        const response =  await axios.get(DISH_ENDPOINT);
        items = MapDish(response.data);
        status = response.status
    } catch (error) {
        items = [];
        if(axios.isAxiosError(error)) 
            status = error.request.status
        else
            status = 500;
    }
   

    
    return GetDishQueryResponseUtil(status,items);

    
    
}