import { Dispatch, FormEventHandler, SetStateAction } from "react";
import { DishI } from "../../../interfaces/Dish.interface";

export default interface FormPropsI {
    //handleSubmit: FormEventHandler<HTMLFormElement>;
    dishes: DishI[];
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>
}