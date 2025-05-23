import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OrderStatus } from "../pages/Orders/enums/OrderStatus.enum";
import React, { useEffect, useState } from "react";

import { initializeObserver } from "./utils/observer.util";
interface SidebarLinkProps {
    href: string, 
    icon: IconDefinition, 
    text: string,
    setOrderStatus: React.Dispatch<React.SetStateAction<OrderStatus>>,
    order_status: OrderStatus,
    observer_id: string;
}

export default function SidebarLink(props: SidebarLinkProps) {
    
    function onClickHandler(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault();
        props.setOrderStatus(props.order_status)
    }
    const [count, setCount] = useState<number>(0);
    useEffect(() => initializeObserver(props.order_status,setCount,props.observer_id), [props.order_status,props.observer_id])


    return (
        <a onClick={e => onClickHandler(e)} href={props.href} className='flex text-lg bg-purple-50'>
            <FontAwesomeIcon size='lg' icon={props.icon} />
            <span className="flex-1">{props.text}</span>
            <span className="countdown text-gray-400">
                <span style={{"--value":count} as React.CSSProperties}></span>
            </span>
        </a>
    );
}
