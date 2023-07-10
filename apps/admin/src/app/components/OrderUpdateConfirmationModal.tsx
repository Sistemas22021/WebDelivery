import { OrderStatus } from "./pages/Orders/enums/OrderStatus.enum";
import OrderInterface from "./pages/Orders/interfaces/order.interface";

declare global {
    interface Window { 
      my_modal_1: any;
    }
}



export default function OrderUpdateConfirmationModal(props: {
    currentOrder: OrderInterface | null,
    setCurrentOrder: React.Dispatch<React.SetStateAction<OrderInterface | null>>
}){

    function onCloseHandler() {
        props.setCurrentOrder(null);
    }

    return (
        <dialog id="my_modal_1" className="modal">
            <form method="dialog" className="modal-box">
                {
                    props.currentOrder
                    ?
                    <p className="py-4 text-lg ">Esta seguro que desea cambiar el estado de la orden a  
                    {
                        props.currentOrder?.status === OrderStatus.PENDING 
                        ? <span className="font-semibold"> En Progreso</span>
                        : <span className="font-semibold"> Completo</span>
                    }
                    ?
                </p>
                : ''
                }
                <div className="modal-action flex justify-start">
                    <div className="flex-1">
                        <button onClick={onCloseHandler} className="btn btn-secondary">Cerrar</button>
                    </div>
                    <button onClick={onCloseHandler} className="btn btn-primary">Aceptar</button>
                </div>
            </form>
        </dialog>
    )
}