import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { ClientEntity } from "./client.entity";
import { OrderDishEntity } from "./order_dish.entity";

@Entity({name:'order'})
export class OrderEntity {

    @PrimaryColumn({type:'varchar',length:256})
    id: string;

    @Column({type:'text'})
    status: string;

    @Column({type:'text'})
    generated_at: string;

    @Column({type:'real'})
    bill: number;

    @ManyToOne(() => ClientEntity, (client) => client.orders)
    @JoinColumn({name:'client'})
    client: ClientEntity;

    @OneToMany(() => OrderDishEntity, (order_dish) => order_dish.order)
    order_dishes: OrderDishEntity[];
}