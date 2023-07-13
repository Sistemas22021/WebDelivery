import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { OrderEntity } from "./order.entity";

@Entity({name:'client'})
export class ClientEntity {

    @PrimaryColumn({type: 'varchar', length: 64})
    identification: string;

    @Column({type:'varchar', length: 64})
    name: string;

    @Column({type:'text'})
    address: string;

    @Column({type:'text'})
    email: string;

    @OneToMany(() => OrderEntity, (order) => order.client)
    orders: OrderEntity[];
}