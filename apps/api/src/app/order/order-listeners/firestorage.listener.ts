import { Injectable, Logger } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { MapOrderCollection } from "../mappers/order.mapper";
import { Order } from "../classes/order.class";
import { InjectRepository } from "nestjs-fireorm";
import { OrderCollection } from "../collections/order.collection";
import { BaseFirestoreRepository } from "fireorm";

@Injectable()
export class OrderFireStorageListener { 

    constructor(
        @InjectRepository(OrderCollection)
        private orderCollection: BaseFirestoreRepository<OrderCollection>
    ) {}

    @OnEvent('order.created')
    async saveOrderInFireStore(order: Order)  {
        try {
            const order_storage = MapOrderCollection(order);
            await this.orderCollection.create(order_storage);
            Logger.log('Guardado exitosamente!')
        } catch (error) {
            Logger.log("Hubo un error almacenando la orden en fire storage.");
        }   
    }

    @OnEvent('order.delete')
    async deleteOrderFromFireStore(order: Order)  {
        try {
            await this.orderCollection.delete(order.getId());
        } catch (error) {
            Logger.log("Hubo un error eliminando el registro en fire storage");
        }   
    }
    @OnEvent('order.update')
    async updateOrderInFireStore(order: Order)  {
        try {
            const order_storage = MapOrderCollection(order);
            await this.orderCollection.update(order_storage);
        } catch (error) {
            Logger.log("Hubo un error actualizando el registro en fire storage");
        }   
    }
}