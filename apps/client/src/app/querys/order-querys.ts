import axios from "axios";
import { OutGoingOrderI } from "../interfaces/OutgoingOrder.interface";
import { HttpStatusE } from "../components/Order/enums/HttpStatus.enum";

const API_URL = `/api/order`;


export async function postOrder(OutGoingOrder: OutGoingOrderI): Promise<HttpStatusE> {

    const response = await axios.post(API_URL,OutGoingOrder);
    

    switch(response.status){
        case 200: return HttpStatusE.SUCCESS;
        case 201: return HttpStatusE.CREATED;
        case 422: return HttpStatusE.UNPROCESSABLE_ENTITY;
        default: return HttpStatusE.SERVER_ERROR
    }

}

