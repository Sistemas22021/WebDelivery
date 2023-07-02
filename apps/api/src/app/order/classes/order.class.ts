import { Client } from "../../shared/interfaces/client.interface";
import { OrderStatus } from "../enums/order-status.enum";
import { OrderDish } from "./order-dish.class";


import { v4 as uuidv4} from "uuid";

interface CreateOrderInterface {
    id?: string;
    generated_at?: Date;
    status?: OrderStatus;
    order_bill?: number;
    dishes: OrderDish[];
    client: Client;
}

6
export class Order {

    private id: string;
    private generated_at: Date;
    private status: OrderStatus;
    private order_bill: number;
    private client: Client;
    private dishes: OrderDish[];



    constructor(order: CreateOrderInterface) {
        //TO-DO
        this.setId(order.id);
        this.setGenerateAt(order.generated_at);
        this.setStatus(order.status);      
        
        this.dishes = order.dishes;
        this.client = order.client;
        this.order_bill = this.calculateOrderBill();
    };

    public completeOrder(): void {
        this.setStatus(OrderStatus.COMPLETED);
    }

    public cancelOrder(): void {
        this.setStatus(OrderStatus.CANCELLED);
    }

    public startOrder(): void {
        this.setStatus(OrderStatus.ON_PROGRESS);
    }

    private calculateOrderBill(): number {
        return this.dishes.reduce((accumulator, currentValue) => accumulator + currentValue.getDishBill(), 0);
    }

    //getters

    getId(): string {
        return this.id;
    }
    getStatus(): OrderStatus {
        return this.status;
    }
    getDate(): Date {
        return this.generated_at;
    }
    getBill(): number {
        return this.order_bill;
    }
    getClient(): Client {
        return this.client;
    }
    getDishes(): OrderDish[] {
        return this.dishes;
    }
    //SETTERs

    setId(id?: string): void {
        this.id = id || uuidv4();
    }
    setGenerateAt(datetime?: Date) {
        this.generated_at = datetime || new Date();
    }
    setStatus(status?: OrderStatus) {
        this.status = status || OrderStatus.PENDING;
    }

}