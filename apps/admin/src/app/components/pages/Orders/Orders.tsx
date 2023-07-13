import { faBell } from "@fortawesome/free-solid-svg-icons";
import PageHeader from "../PageHeader";
import SearchBox from "../../utils/SearchBox";

import Order from "./Order";
import { useEffect, useRef, useState } from "react";
import { OrderStatus } from "./enums/OrderStatus.enum";
import OrderInterface from "./interfaces/order.interface";
import loadOrders from "./utils/loadOrders.util";
import Loader from "../../Loader";
import { OrderObserver } from "./classes/OrdersObserver.class";
import FilterOrders from "./utils/filterOrders.util";
import AddOrderObserver from "./utils/AddOrderObserver";
import OrderUpdateConfirmationModal from "./OrderUpdateConfirmationModal";





export default function Orders(props: { orders_status: OrderStatus}) {

    const [orders, setOrders] = useState<OrderInterface[]>([]);
    const [displayedOrders, setDisplayedOrders] = useState<OrderInterface[]>([]);
    const [onLoad,setOnLoad] = useState<boolean>(false);
    const [toastText, setToastText] = useState<string>('');
    const [currentOrder, setCurrentOrder] = useState<OrderInterface | null>(null);
    const [nextStatus, setNextStatus] = useState<OrderStatus>(OrderStatus.ON_PROGRESS);

    
    const observerRef = useRef(
        new OrderObserver(props.orders_status,setOrders,'Contenedor')
    );
    const ordersRef = useRef<OrderInterface[]>([]);

    useEffect(() => {

        const incoming_orders = orders.length - ordersRef.current.length;
            
        //loadOrders(props.orders_status,setOrders, setOnLoad)
        const aux = FilterOrders(orders,props.orders_status);
        AddOrderObserver(props.orders_status,setOrders, observerRef);
        setDisplayedOrders(aux);

        if (incoming_orders > 0 && ordersRef.current.length !== 0)
                setToastText(`Ha ingresado una nueva orden`);
        setTimeout(() => {
            setToastText('');
        }, 3000);
        
        ordersRef.current = orders;
    },[props.orders_status,orders]);

    useEffect(() => loadOrders(setOrders,setOnLoad), [])
    
    useEffect(() =>{
        if (currentOrder)
            window.my_modal_1.showModal();
    },[currentOrder])

    return (
        <div>
            
            <OrderUpdateConfirmationModal next_status={nextStatus} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder}/>
            {
                toastText.length > 0 ? <ToastContainer text={toastText}/>  : <div></div>
            }
            <PageHeader  icon={faBell} header={props.orders_status}/>
            {
                onLoad ?
                <LoaderContainer/>
                :
                ( orders.length ? <OrdersContainer setNextStatus={setNextStatus} setCurrentOrder={setCurrentOrder} orders={displayedOrders}/> : <EmptyOrdersContainer/>   )
            }
        </div>
    )
}

function ToastContainer(props: {text: string}) {
    return (
        <div className="toast toast-end">
            <div className="alert alert-info">
                <span>{props.text}</span>
            </div>
        </div>
    );
}

function LoaderContainer() {
    return (
        <div className="hero min-h-screen bg-base-200 py-8"> <Loader/> </div>
    );
}

function EmptyOrdersContainer() {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                <h1 className="text-xl font-bold text-gray-400">No se encontraron ordenes</h1>
                </div>
            </div>
        </div>
    )
}

function OrdersContainer(props: {
    orders: OrderInterface[],
    setCurrentOrder: React.Dispatch<React.SetStateAction<OrderInterface | null>>,
    setNextStatus: React.Dispatch<React.SetStateAction<OrderStatus>>
}) {
    return (
        <div>
            {
                /*<div className='px-8 pt-14' >
                <SearchBox/>
            </div>*/
            }
            <div className="p-8 flex flex-col gap-6">
                {props.orders.map((order, index) => <Order setNextStatus={props.setNextStatus} setCurrentOrder={props.setCurrentOrder} key={`order-${index}`} order={order}/>)}
            </div>
        </div>
    );
}