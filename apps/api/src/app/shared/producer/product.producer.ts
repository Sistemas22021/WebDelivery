import { FetchDish} from "../interfaces/fetch.interface";
import { Injectable } from "@nestjs/common";
import { DishInterface } from "../../dish/interfaces/dish.interface";



const DISHES: DishInterface[] = [
    {
        //dish_id: '4ce4a06d-f4d4-4649-8fe5-9b9e18f1750c',
        dish_id: "1",
        name: "Pollos Desayuno Clasico",
        description: "Pollos Desayuno Clasico",
        price: 30.00,
    },
    {
        //dish_id: '34a6f5c2-2118-4d93-b5d5-8d2a44cce786',
        dish_id: "2",
        name: "Galleta de Pollo",
        description: "Filete de Pollo Frito sobre una galleta con mantequilla",
        price: 50.00
    },
    {
        //dish_id: 'cc7a19bb-99c1-431d-9ca5-f6ed52de1c56',
        dish_id: "3",
        name: "Pollos Sandwich de Desayuno",
        description: "Dos huevos, pollo asado deshuesado, chile verde y salsa servido en nuestro panecillo clasico",
        price: 80.00
    },
    {
        // dish_id: '36dc983a-98e2-4cb7-b9ac-e761401deeda',
        dish_id: "4",
        name: "Pollos Tacos de Desayuno",
        description: "Pollo especiado deshebrado con huevos, papas, chile verde y salsa.",
        price: 60.00
    },
    {
        // dish_id: '5ce2658b-f8b8-4907-8506-ea7bafa91c02',
        dish_id: "5",
        name: "South Valley",
        description: "Chorizo, huevos, papas, chile rojo y queso.",
        price: 45.00
    }
];



@Injectable()
export class FetchDishFromArray implements FetchDish{
    
    public fetch(): DishInterface[]{

        return DISHES;
    }
}