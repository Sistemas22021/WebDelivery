
import SidebarContent from './SidebarContent';
import Orders from '../pages/Orders/Orders';
import { OrderStatus } from '../pages/Orders/enums/OrderStatus.enum';
import { useState } from 'react';



export default function Sidebar() {
    const [orderStatus,setOrderStatus] = useState<OrderStatus>(OrderStatus.PENDING);
    

    
    
    
    return(
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <Orders orders_status={orderStatus}/>
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                <SidebarContent setOrderStatus={setOrderStatus} />
            </div>
        </div>
    )
}







