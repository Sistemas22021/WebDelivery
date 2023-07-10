import { OrderData } from "./order-data.interface"
import { SenderResponse } from "./sender-response.interface"
export interface SenderOrder {
    send(order: OrderData): Promise<SenderResponse>
    makeResponse(message: string, success: boolean ): SenderResponse
}