import { Inject, Injectable} from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { SenderOrder } from "../../sender/interfaces/sender-order.interface";
import { MapOrderToTelegramMessage } from "../mappers/order.mapper";
import { Order } from "../classes/order.class";


@Injectable()
export class OrderTelegramListener { 

    constructor(
        @Inject('SenderOrderTelegram')
        private senderOrder: SenderOrder,
    ) {}

    @OnEvent('order.created')
    async sendOrderTelegramMessage(order: Order)  {
        const email_order = MapOrderToTelegramMessage(order);
        await this.senderOrder.send(email_order);
        
    }
}