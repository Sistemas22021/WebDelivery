import axios from "axios";
import { DishI } from "../interfaces/Dish.interface";
import { MapDish } from "../mappers/dish-mappers";

const API_URL = `/api/dish`;

export async function getDishes(): Promise<DishI[]> {


    const response =  await axios.get(API_URL);

    if (!(response.status === 200)) return [];

    
    return MapDish(response.data);
    
}