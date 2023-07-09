import OrderInterface from "./interfaces/order.interface";



export default function Order(props: { order: OrderInterface }) {
    return(
        <div className="border-gray-200 border-2 p-6 xl:w-3/4 ">
            <div className="flex flex-col  lg:flex-row gap-4">
                <div className="flex-1 flex flex-row justify-center lg:flex-row lg:justify-start">
                    <button className="btn btn-wide btn-primary">Atender</button>
                </div>
                <div className="flex flex-row justify-center">
                    <div className="badge badge-info text-xl p-3">{props.order.status}</div>
                </div>
            </div>
            <div className="flex flex-col gap-6 py-4 w-3/4">
                <div className="flex flex-col 2xl:flex-row gap-4 lg:gap-10">
                    <OrderField label="Nombre" field={props.order.client.name}/>
                    <OrderField label="Cedula" field={props.order.client.identification}/>
                    <OrderField label="Fecha y Hora" field={props.order.created_at}/>
                    <OrderField label="Total a pagar" field={String(props.order.order_bill)}/>
                    <OrderField label="Correo" field={props.order.client.email}/>
                </div>
                <div>
                    <OrderField label="Direccion" field={props.order.client.address}/>
                </div>
                <div>
                    <h3 className="text-gray-500">Pedido</h3>
                    <div className="flex flex-col lg:flex-row gap-4">
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
            <h3>{props.field}</h3>
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
