import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OrderStatus } from "../pages/Orders/enums/OrderStatus.enum";

interface SidebarLinkProps {
    href: string, 
    icon: IconDefinition, 
    text: string,
    setOrderStatus: React.Dispatch<React.SetStateAction<OrderStatus>>,
    order_status: OrderStatus
}

export default function SidebarLink(props: SidebarLinkProps) {
    
    function onClickHandler(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault();
        props.setOrderStatus(props.order_status)
    }
    
    return (
        <a onClick={e => onClickHandler(e)} href={props.href} className='text-lg bg-purple-50'>
            <FontAwesomeIcon size='lg' icon={props.icon} />
            <span>{props.text}</span>
        </a>
    );
}
