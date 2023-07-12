import { Dispatch, SetStateAction } from "react";
import { QueryDishesResponse } from "./QueryDishesResponse.interface";
export default interface FormPropsI {
    //handleSubmit: FormEventHandler<HTMLFormElement>;
    dishes: QueryDishesResponse;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>
}