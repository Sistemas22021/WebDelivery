import { Inject, Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { SenderOrder } from "../../sender/interfaces/sender-order.interface";
import { MapOrderCollection, MapOrderToEmailData } from "../utils/service.util";
import { Order } from "../classes/order.class";
import { InjectRepository } from "nestjs-fireorm";
import { OrderCollection } from "../collections/order.collection";
import { BaseFirestoreRepository } from "fireorm";

@Injectable()
export class OrderCreatedListener { 

    constructor(
        @Inject('SenderOrder')
        private senderOrder: SenderOrder,
        @InjectRepository(OrderCollection)
        private orderCollection: BaseFirestoreRepository<OrderCollection>
    ) {}

    @OnEvent('order.created')
    async sendOrderEmail(order: Order)  {
        const email_order = MapOrderToEmailData(order);
        await this.senderOrder.send(email_order);

    }

    @OnEvent('order.created')
    async saveOrderInFireStore(order: Order)  {
        try {
            const order_storage = MapOrderCollection(order);
            await this.orderCollection.create(order_storage);

        } catch (error) {
            Logger.log("Hubo un error almacenando la orden en fire storage.");
        }   
    }

    @OnEvent('order.created')
    async saveOrderInMySQL(order: Order)  {
        console.log(`Saving into mysql...`);
    }
}