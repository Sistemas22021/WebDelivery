import { faBell } from "@fortawesome/free-solid-svg-icons";
import PageHeader from "../PageHeader";
import SearchBox from "../../utils/SearchBox";

import Order from "./Order";
import { useEffect, useState } from "react";
import { OrderStatus } from "./enums/OrderStatus.enum";
import OrderInterface from "./interfaces/order.interface";
import loadOrders from "./utils/loadOrders.util";
import Loader from "../../Loader";
export default function Orders(props: { orders_status: OrderStatus}) {

    const [orders, setOrders] = useState<OrderInterface[]>([]);
    const [onLoad,setOnLoad] = useState<boolean>(true);

    useEffect(() => loadOrders(setOrders, setOnLoad),[]);

    return (
        <div>
            <PageHeader icon={faBell} header='Pendientes'/>
            {
                onLoad ?
                <div className="flex justify-center py-8"> <Loader/> </div>
                :
                <div>
                    <div className='px-8 pt-14' >
                        <SearchBox/>
                    </div>
                    <div className="p-8 flex flex-col gap-6">
                        {orders.map((order, index) => <Order key={`order-${index}`} order={order}/>)}
                    </div>
                </div>
            }
        </div>
    )
}