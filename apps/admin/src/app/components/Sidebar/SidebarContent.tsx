import { faBell, faListUl } from "@fortawesome/free-solid-svg-icons";
import SidebarLink from "./SidebarLink";
import { OrderStatus } from "../pages/Orders/enums/OrderStatus.enum";
export default function SidebarContent(props: { setOrderStatus: React.Dispatch<React.SetStateAction<OrderStatus>>}) {
    
    
    
    return (
        <div className="w-80 h-full bg-white lg:border-e-2 border-gray-200">
            <div className="flex flex-col justify-center align-middle lg:border-b-2 h-16 px-8 border-gray-200">
                <h1 className=" text-2xl font-bold">Ordenes</h1>
            </div>
            <ul className="menu text-base-content gap-2 py-8 px-6">
            {/* Sidebar content here */}
                <li>
                    <SidebarLink order_status={OrderStatus.PENDING} setOrderStatus={props.setOrderStatus} key='link-1'   href='#' icon={faBell} text='Pendientes'/>
                </li>
                <li>
                    <SidebarLink order_status={OrderStatus.ON_PROGRESS} setOrderStatus={props.setOrderStatus} key='link-2'  href='#' icon={faListUl} text='En Progreso' />
                </li>
            </ul>
        </div>
    );
}