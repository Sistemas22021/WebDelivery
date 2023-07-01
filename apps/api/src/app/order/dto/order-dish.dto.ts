import { ApiProperty } from "@nestjs/swagger";
import {IsNumber, IsPositive } from "class-validator";

export class OrderDishDto {




    @ApiProperty({example: 1})    
    @IsNumber()
    dish_id: number;


    @ApiProperty({example: 5})
    @IsPositive()
    count: number;
}