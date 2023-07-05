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

export default function OrderForm(props: FormPropsI) {

    const [orderDishes, setOrderDishes] = useState<OrderDishI[]>([]);
    const [orderString, setOrderString] = useState<string>('');

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const target: HTMLFormElement = e.currentTarget;
        const formData: FormData = new FormData(target);

        const outgoingOrder = MapOutgoingOrderMapper(formData, orderDishes);

        const result = await postOrder(outgoingOrder);
        console.log(`Result: ${result}`);
    }

    useEffect(() => {
        setOrderString(BuildOrderStringUtil(orderDishes));
    },[orderDishes])

    return (
        <form onSubmit={handleSubmit} className="w-mi-form w-full font-bold text-info text-lg">
            <div className="flex justify-between">
                <div className="m-1">
                    <FormField type='text' id="name" name="name" content="Nombre" placeholder="John Watts" />
                </div>

                <div className="m-1">
                    <FormField type='number' id="identification" name="identification" content="Cedula" placeholder="29333123"/>
                </div>
            </div>
            <div className="w-full">
                <FormField type='email' id="email" name="email" content="Correo Electronico" placeholder="lospolloshermanos@gmail.com"/>
            </div>
            <div className="w-full ">
                <FormField type='text' id="address" name="address" content="Direccion" placeholder="La Asuncion, Escudo de Armas"/>
            </div>
            <label className="label mt-2 mb-2" htmlFor="pedido">
                <span className="label-text text-info">Pedido</span>
            </label>
            <div className="flex flex-col  gap-2 mb-4">
                { 
                props.loading ? <div> <Loader/> </div> 
                : 
                props.dishes.map((dish, index) => <DishOption key={`${dish.dish_id}`} setOrder={setOrderDishes} order={orderDishes} dish={dish}/>) 
                }
            </div>
            <OrderTextArea value={orderString}/>
            <button disabled={props.loading} className="btn btn-outline w-1/2 btn-success" type="submit">
                Enviar
            </button>
        </form>
    );
}