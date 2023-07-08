import { Inject, Injectable} from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { SenderOrder } from "../../sender/interfaces/sender-order.interface";
import {MapOrderToEmailData } from "../utils/service.util";
import { Order } from "../classes/order.class";


@Injectable()
export class SendEmailListener { 

    constructor(
        @Inject('SenderOrder')
        private senderOrder: SenderOrder,
    ) {}

    @OnEvent('order.created')
    async sendOrderEmail(order: Order)  {
        const email_order = MapOrderToEmailData(order);
        await this.senderOrder.send(email_order);

    }
}