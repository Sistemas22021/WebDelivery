
import { Dish } from "../../dish/classes/dish.class";
import { DishInterface } from "../../dish/interfaces/dish.interface";


export interface CreateOrderDish {
    dish: DishInterface;
    current_price: number;
    quantity: number;
    dish_bill?: number;
}

export class OrderDish extends Dish {
    
    private current_price: number;
    private quantity: number;
    private dish_bill: number;


    constructor(order_dish: CreateOrderDish) {
        super();
        this.id = order_dish.dish.dish_id;
        this.name = order_dish.dish.name;
        this.description = order_dish.dish.description;
        this.real_price = order_dish.dish.price;
        this.current_price = order_dish.current_price;
        this.quantity = order_dish.quantity;
        this.setDishBill(order_dish.dish_bill);
    }



    private calculateDishBill(): number {
        //TO-DO

        return this.current_price * this.quantity;
    }   
    //getters

    getDishBill(): number {
        return this.dish_bill;
    }
    getCurrentPrice(): number {
        return this.current_price;
    }

    getQuantitiy(): number {
        return this.quantity;
    }


    //Setters
    setDishBill(bill?: number): void {
        this.dish_bill = bill || this.calculateDishBill();
    }
}