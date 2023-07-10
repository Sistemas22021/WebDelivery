import { IsArray, IsEmail, IsNotEmpty, IsPositive, ValidateNested} from "class-validator";
import { OrderDishDto } from "./order-dish.dto";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class ReceivedOrderDto {



    @ApiProperty({example: 'Walter White'})
    @IsNotEmpty()
    client_name: string;

    @ApiProperty({example: '341245512'})
    @IsNotEmpty()
    client_id: string;

    @ApiProperty({example: '308 Negra Arroyo LN Alburquerque, NM 87140'})
    @IsNotEmpty()
    address: string;

    @ApiProperty({example: 'walterWhite@bad.com'})
    @IsEmail()
    email: string;

    @ApiProperty({example: 95})
    @IsPositive()
    order_bill: number;

    
    @ApiProperty({isArray: true, type: OrderDishDto})
    @IsArray()
    @ValidateNested({each:true})
    @Type(() => OrderDishDto)
    dishes: OrderDishDto[]
}