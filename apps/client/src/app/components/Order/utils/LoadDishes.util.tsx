import { Dispatch, SetStateAction } from "react";
import { getDishes } from "../../../querys/dish-querys";
import { DishI } from "../../../interfaces/Dish.interface";

export default (setDishes: Dispatch<SetStateAction<DishI[]>>, setLoading: Dispatch<SetStateAction<boolean>> ) => {

    const loadDishes = async () => {
        
        const dishes = await getDishes();
        setLoading(false);
        setDishes(dishes);
    }
    loadDishes();
}