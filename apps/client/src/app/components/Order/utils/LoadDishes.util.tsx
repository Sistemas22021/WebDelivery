import { Dispatch, SetStateAction } from "react";
import { getDishes } from "../querys/dish-querys";
import { QueryDishesResponse } from "../interfaces/QueryDishesResponse.interface";

export default (setDishes: Dispatch<SetStateAction<QueryDishesResponse>>, setLoading: Dispatch<SetStateAction<boolean>> ) => {

    const loadDishes = async () => {
        const dishes = await getDishes();
        setTimeout(() => {
            setLoading(false);
            setDishes(dishes);
        }, 2000);
    }
    loadDishes();
}