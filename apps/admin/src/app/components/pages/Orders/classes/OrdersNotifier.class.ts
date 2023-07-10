import OrderInterface from "../interfaces/order.interface";

export interface Observer {

    id: string;
    update(orders: OrderInterface[]): void;
}


//Notificador que se encargara de avisar cada vez que entren ordenes nuevas.
export class OrdersNotifier{

    private observers: Observer[] = [];
    


    attach(observer: Observer): void {
        const exists = this.observers.find(o => o.id === observer.id);
        if (!exists) 
            this.observers.push(observer);
    }
    detach(observer: Observer): void {
        this.observers = this.observers.filter(element=> element.id !== observer.id);
    }
    notify(orders: OrderInterface[]): void {
        this.observers.forEach(observer => observer.update(orders));
    }
}


export const NOTIFIER = new OrdersNotifier();