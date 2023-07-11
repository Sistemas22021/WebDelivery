import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";
import { DishEntity } from "../../dish/entities/dish.entity";

@Entity({name:'order_dish'})
export class OrderDishEntity {
    @PrimaryGeneratedColumn()
    id: number;


    @Column({type:'int'})
    quantity: number;

    @Column({type:'real'})
    current_price: number;

    @ManyToOne(() => OrderEntity, (order) => order.order_dishes)
    @JoinColumn({name:'order_id'})
    order: OrderEntity

    @ManyToOne(() => DishEntity, (dish) => dish.order_dishes, {eager: true})
    @JoinColumn({name:'dish_id'})
    dish: DishEntity
    
}