import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { OrderDishEntity } from "../../order/entities/order_dish.entity";

@Entity({name:'dish'})
export class DishEntity {
    @PrimaryColumn({type:'int', name:'id'})
    dish_id: number;

    @Column({type:'text'})
    name: string;

    @Column({type:'text'})
    description: string;

    @Column({type:'real'})
    price: number;

    @OneToMany(() => OrderDishEntity,(order_dish) => order_dish.dish)
    order_dishes: OrderDishEntity[];
}