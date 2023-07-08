import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { Order } from "../classes/order.class";


@Injectable()
export class SaveIntoMySQlListener { 


    @OnEvent('order.created')
    async saveOrderInMYSQL(order: Order)  {
        Logger.log(`Saving into mysql...`);
    }
}