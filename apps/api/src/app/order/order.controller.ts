import { Controller, Post, Body, Patch } from '@nestjs/common';
import { ReceivedOrderDto } from './dto/received-order.dto';
import { OrderService } from './order.service';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';


@ApiTags('Pedidos')
@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) {}

    @ApiCreatedResponse({description: 'El pedido fue procesado exitosamente'})
    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiUnprocessableEntityResponse({description: 'La estructura de los datos enviados no es correcta'})
    @Post()
    async createOrder(@Body() orderDto: ReceivedOrderDto){
        return await this.orderService.createOrder(orderDto);
    }

    @ApiCreatedResponse()
    @ApiInternalServerErrorResponse()
    @ApiNotFoundResponse()
    @ApiUnprocessableEntityResponse()
    @Patch()
    async updateOrderStatus(@Body() status: UpdateOrderStatusDto) {
        return this.orderService.updateOrderStatus(status);
    }
}
