import axios from "axios";
import { OutGoingOrderI } from "../interfaces/OutgoingOrder.interface";

const API_URL = `/api/order`;


export async function postOrder(OutGoingOrder: OutGoingOrderI): Promise<boolean> {

    const response = await axios.post(API_URL,OutGoingOrder);
    if (response.status === 201 || response.status === 200)
        return true;
    return  false;
}

