import { useState } from "react";
import { OrderStatus } from "./enums/OrderStatus.enum";
import OrderInterface from "./interfaces/order.interface";



export default function Order(props: 
    { 
    order: OrderInterface, 
    setCurrentOrder: React.Dispatch<React.SetStateAction<OrderInterface | null>>,
    setNextStatus: React.Dispatch<React.SetStateAction<OrderStatus>>
}) {

   
    function onUpdateOrderHandler() {
        if (props.order.status === OrderStatus.PENDING)
            props.setNextStatus(OrderStatus.ON_PROGRESS)
        if (props.order.status === OrderStatus.ON_PROGRESS)
            props.setNextStatus(OrderStatus.COMPLETED)

        props.setCurrentOrder(props.order);
    }
    function onCancelOrderHandler() {
        props.setNextStatus(OrderStatus.CANCELLED);
        props.setCurrentOrder(props.order);
    }

    return(
        <div className="border-gray-200 border-2 p-6 xl:w-3/4 shadow-2xl rounded-md">
            
            <div className="flex flex-col  lg:flex-row gap-4">
                <div className="flex-1 flex flex-col gap-4">
                    {
                        props.order.status === OrderStatus.PENDING
                        ? <button onClick={onUpdateOrderHandler} className='btn btn-wide btn-warning'>Atender</button>
                        : <button onClick={onUpdateOrderHandler} className='btn btn-wide btn-info'>Completar</button>
                    }

                    <div>
                        <button onClick={onCancelOrderHandler} className='btn btn-sm btn-accent'>Cancelar</button>
                    </div>
                </div>
                <div className="flex flex-row justify-center">
                    {
                        props.order.status === OrderStatus.PENDING
                        ? <div className='badge badge-warning text-md p-3'>{props.order.status}</div>
                        : <div className='badge badge-info text-md p-3'>{props.order.status}</div>
                    }
                </div>
            </div>
            <div className="flex flex-col gap-6 py-4 2xl:w-3/4">
                <div className="grid grid-cols-1 sm:md:grid-cols-2  md:grid-cols-2 lg:grid-cols-2 gap-4">
                    <OrderField label="Nombre" field={props.order.client.name}/>
                    <OrderField label="Cedula" field={props.order.client.identification}/>
                    <OrderField label="Fecha y Hora" field={props.order.created_at}/>
                    <OrderField label="Total a pagar" field={`${String(Number(props.order.order_bill).toFixed(2))} $`}/>
                    <OrderField label="Correo" field={props.order.client.email}/>
                </div>
                <div>
                    <OrderField label="Direccion" field={props.order.client.address}/>
                </div>
                <div>
                    <h3 className="text-gray-500 py-4">Pedido</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {props.order.dishes.map((order_dish, index) => <OrderItem key={order_dish.dish.name+index} label={`${order_dish.dish.name} X ${order_dish.quantity}`} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}


function OrderField(props: { label: string, field: string }){
    return(
        <div>
            <h3 className="text-gray-500">{props.label}</h3>
            <h3 className="text-md lg:text-xl">{props.field}</h3>
        </div>
    );
}
function OrderItem(props: { label: string }) {
    return (
        <div className="px-4 py-1 border-gray-200 rounded-sm border-2 shadow-gray-300">
            <p className="text-black">{props.label}</p>
        </div>
    );
}
