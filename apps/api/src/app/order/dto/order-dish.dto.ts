import { ApiProperty } from "@nestjs/swagger";
import {IsPositive } from "class-validator";

export class OrderDishDto {




    @ApiProperty({example: 1})    
    dish_id: number | string;


    @ApiProperty({example: 5})
    @IsPositive()
    count: number;
}