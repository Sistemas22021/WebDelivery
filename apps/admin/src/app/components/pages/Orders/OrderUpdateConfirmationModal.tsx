import { useState } from "react";
import { OrderStatus } from "./enums/OrderStatus.enum";
import OrderInterface from "./interfaces/order.interface";
import { updateOrderStatus } from "./querys/updateOrder.query";
import Loader from "../../Loader";
import getUpdateMessageFromResponseUtil from "./utils/getUpdateMessageFromResponse.util";
import getOrderUpdateMessageUtil from "./utils/getOrderUpdateMessage.util";

declare global {
    interface Window { 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      my_modal_1: HTMLDialogElement;
    }
}



export default function OrderUpdateConfirmationModal(props: {
    currentOrder: OrderInterface | null,
    next_status: OrderStatus,
    setCurrentOrder: React.Dispatch<React.SetStateAction<OrderInterface | null>>
}) {

    const [onLoad, setOnLoad] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>('');
    const [disableButtons, setDisableButton] = useState<boolean>(false);

    function onCloseHandler() {
        window.my_modal_1.close();
        setTimeout(() => {
            props.setCurrentOrder(null);
        }, 500);
    }

    function resetProps() {
        
        window.my_modal_1.close();
        props.setCurrentOrder(null);
        setDisableButton(false);
        setResponseMessage('');
    }

    async function onUpdateHandler() {
        if (props.currentOrder){
            let response = 500;

            const order_id = props.currentOrder.id;
            setOnLoad(true);
            setDisableButton(true);

            response = await updateOrderStatus({order_id, status: props.next_status});

            setTimeout(() => {
                setOnLoad(false);
                setResponseMessage(
                    getUpdateMessageFromResponseUtil(response)
                );
            }, 1500);

            setTimeout(() => {
                resetProps();
            }, 3000);

        }
    }


    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                {
                    props.currentOrder ?
                    <div>

                        <MessageContainer status={props.next_status} />
                        { responseMessage.length !== 0 ? <p className="text-lg font-semibold">{responseMessage}</p> : '' }
                        {onLoad ? <LoaderContainer/> : ''}
                        <div className="modal-action flex justify-start">
                            <div className="flex-1">
                                <button type="button" disabled={disableButtons} onClick={onCloseHandler} className="btn btn-secondary">Cerrar</button>
                            </div>
                            <button type="button" disabled={disableButtons} onClick={onUpdateHandler}  className="btn btn-primary">Aceptar</button>
                        </div>
                    </div>
                    : <div></div>
                }
            </div>
        </dialog>
    )
}

function MessageContainer(props: {status: OrderStatus}) {
    return (
        <div className="py-2">
            <p className="font-semibold">{getOrderUpdateMessageUtil(props.status)}</p>
        </div>
    );
}

function LoaderContainer() {
    return (
        <div className="flex justify-center"> <Loader /> </div>
    )
}
