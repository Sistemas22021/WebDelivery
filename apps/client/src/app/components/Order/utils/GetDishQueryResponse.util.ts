import { HttpStatusCode } from "axios";
import { QueryDishesResponse } from "../interfaces/QueryDishesResponse.interface";
import { Dish } from "../interfaces/Dish.interface";

export default (http_status: HttpStatusCode, items: Dish[]): QueryDishesResponse => {
    switch(http_status) {
        case 200: return { message: '', items };
        default: return { message: 'No se pudieron cargar los platillos', items: []}; 
    }
}