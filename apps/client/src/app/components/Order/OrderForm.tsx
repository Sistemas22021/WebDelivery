import { FormEvent, useEffect, useState } from "react";
import Loader from "../Loader";
import DishOption from "./DishOption";
import FormField from "./FormField";
import OrderTextArea from "./OrderTextArea";
import FormPropsI from "./interfaces/FormProps.interface";
import { OrderDishI } from "../../interfaces/OrderDish.interface";
import BuildOrderStringUtil from "./utils/BuildOrderString.util";
import { OutGoingOrderI } from "../../interfaces/OutgoingOrder.interface";
import MapOutgoingOrderMapper from "./mappers/MapOutgoingOrder.mapper";
import { postOrder } from "../../querys/order-querys";
import { useTranslation } from "react-i18next";
import GetOrderResponseMessage from "./utils/GetOrderResponseMessage";

export default function OrderForm(props: FormPropsI) {

    const [orderDishes, setOrderDishes] = useState<OrderDishI[]>([]);
    const [orderString, setOrderString] = useState<string>('');
    const [orderResponse, setOrderResponse] = useState<string>('');
    
    const [translator] = useTranslation("global");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(orderDishes.length === 0) return;
        const target: HTMLFormElement = e.currentTarget;
        const formData: FormData = new FormData(target);

        const outgoingOrder: OutGoingOrderI = MapOutgoingOrderMapper(formData, orderDishes);

        props.setLoading(true);
        const response = await postOrder(outgoingOrder);
        setTimeout(() => {
            
            props.setLoading(false);
            setOrderResponse(GetOrderResponseMessage(response));
        }, 2000);
        
    }

    useEffect(() => {
        setOrderString(BuildOrderStringUtil(orderDishes));
    },[orderDishes])

    return (
        <form onSubmit={handleSubmit} className="w-mi-form w-full font-bold text-info text-lg">
            <div className="flex justify-between">
                <div className="m-1">
                    <FormField required disabled={props.loading} type='text' id="name" name="name" content={translator('form.name')} placeholder={translator('form.label_name')} />
                </div>

                <div className="m-1">
                    <FormField required disabled={props.loading} type='number' id="identification" name="identification" content={translator('form.id')} placeholder="29333123"/>
                </div>
            </div>
            <div className="w-full">
                <FormField required disabled={props.loading} type='email' id="email" name="email" content={translator('form.email')} placeholder="lospolloshermanos@gmail.com"/>
            </div>
            <div className="w-full ">
                <FormField required disabled={props.loading} type='text' id="address" name="address" content={translator('form.direction')} placeholder="La Asuncion, Escudo de Armas"/>
            </div>
            <label className="label mt-2 mb-2" htmlFor="pedido">
                <span className="label-text text-info">{translator('form.order')}</span>
            </label>
            <div className="flex flex-col  gap-2 mb-4">
                { 
                props.loading ? <div> <Loader/> </div> 
                : 
                props.dishes.map((dish, index) => <DishOption key={`${dish.dish_id}`} setOrder={setOrderDishes} order={orderDishes} dish={dish}/>) 
                }
            </div>
            { !props.loading && <OrderTextArea value={orderString}/>}
            <div> { !props.loading && orderResponse} </div>
            <button disabled={props.loading} className="btn btn-outline w-1/2 btn-success mt-4" type="submit">
                {translator('btn.btn-form')}
            </button>
        </form>
    );
}