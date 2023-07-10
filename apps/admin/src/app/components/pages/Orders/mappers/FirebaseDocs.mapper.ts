import { DocumentData } from "firebase/firestore/lite";
import { IncomingFirebaseOrder } from "../interfaces/IncomingFirebaseOrder.interface";

export default function MapOrderDoc(data: DocumentData): IncomingFirebaseOrder {

    return {
        client: data.client,
        dishes: data.dishes,
        generated_at: data.generated_at,
        id: data.id,
        order_bill: data.order_bill,
        status: data.status
    }
}