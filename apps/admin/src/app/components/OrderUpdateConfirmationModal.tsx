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
        <>
            {/* Open the modal using ID.showModal() method */}
           
            <dialog id="my_modal_1" className="modal">
                <form method="dialog" className="modal-box">
                    <p className="py-4 text-lg font-semibold">Esta seguro que desea cambiar el estado de la orden?</p>
                    <div className="modal-action flex justify-start">
                    {/* if there is a button in form, it will close the modal */}
                        <div className="flex-1">
                            <button onClick={onCloseHandler} className="btn btn-secondary">Cerrar</button>
                        </div>
                        <button onClick={onCloseHandler} className="btn btn-primary">Aceptar</button>
                    </div>
                </form>
            </dialog>
        </>
    )
}