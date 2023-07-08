import { useEffect, useState } from "react";
import LoadDishesUtil from "./utils/LoadDishes.util";
import OrderForm from "./OrderForm";
import { QueryDishesResponse } from "./interfaces/QueryDishesResponse.interface";

export default function Order() {

    const [dishList, setDishList] = useState<QueryDishesResponse>({items: [], message: ''});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => LoadDishesUtil(setDishList,setLoading),[])
    
    return (
        <OrderForm setLoading={setLoading} loading={loading} dishes={dishList}/>
    );
}