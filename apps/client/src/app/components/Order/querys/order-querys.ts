import axios, { HttpStatusCode } from "axios";
import { OutGoingOrder } from "../interfaces/OutgoingOrder.interface";
import getResponseStatus from "../utils/GetResponseStatus.util";
import { ORDER_ENDPOINT } from "./path_urls/path_urls";



export async function postOrder(OutGoingOrder: OutGoingOrder): Promise<HttpStatusCode> {
    let status;
    try {
        const response = await axios.post(ORDER_ENDPOINT,OutGoingOrder);
        status = response.status;
    } catch (error) {
        if(axios.isAxiosError(error))
            status = error.request.status;
        else
            status = 500;
    }
        
    return getResponseStatus(status);

}

