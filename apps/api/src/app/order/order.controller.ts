import { Controller, Post, Body } from '@nestjs/common';
import { ReceivedOrderDto } from './dto/received-order.dto';
import { OrderService } from './order.service';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';


@ApiTags('Pedidos')
@Controller('order')
export class OrderController {

    constructor(private orderService: OrderService) {}

    @ApiCreatedResponse({description: 'El pedido fue procesado exitosamente'})
    @ApiInternalServerErrorResponse({description: 'Ocurrio un error dentro del servidor.'})
    @ApiUnprocessableEntityResponse({description: 'La estructura de los datos enviados no es correcta'})
    @Post()
    async createOrder(@Body() orderDto: ReceivedOrderDto){
        return await this.orderService.createOrder(orderDto);
    }
}
