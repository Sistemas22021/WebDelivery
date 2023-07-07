import { useEffect, useState } from "react";
import { DishI } from "../../interfaces/Dish.interface";
import LoadDishesUtil from "./utils/LoadDishes.util";
import OrderForm from "./OrderForm";

export default function OrderAux() {

    const [dishList, setDishList] = useState<DishI[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => LoadDishesUtil(setDishList,setLoading),[])





    return (
        <OrderForm setLoading={setLoading} loading={loading} dishes={dishList}/>
    );
}