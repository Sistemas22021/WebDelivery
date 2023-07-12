import { ApiProperty } from "@nestjs/swagger";
import { OrderStatus } from "../enums/order-status.enum";
import { IsEnum } from "class-validator";

export class UpdateOrderStatusDto {

   
    @ApiProperty({type: 'string'})
    order_id: string;

    @ApiProperty({ type: OrderStatus, enum: OrderStatus})
    @IsEnum(OrderStatus)
    status: OrderStatus;
}