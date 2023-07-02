import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { SenderOrder } from "../../sender/interfaces/sender-order.interface";
import { MapOrderToEmailData } from "../utils/service.util";
import { Order } from "../classes/order.class";

@Injectable()
export class OrderCreatedListener { 

    constructor(
        @Inject('SenderOrder')
        private senderOrder: SenderOrder,
    ) {}

    @OnEvent('order.created')
    async sendOrderEmail(order: Order)  {
        const email_order = MapOrderToEmailData(order);
        await this.senderOrder.send(email_order);

        console.log("Email sent.");
    }

    @OnEvent('order.created')
    async saveOrderInFireStore(order: Order)  {
        console.log(`Saving into firestore`);
    }

    @OnEvent('order.created')
    async saveOrderInMySQL(order: Order)  {
        console.log(`Saving into mysql...`);
    }
}