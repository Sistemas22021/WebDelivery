
import { UpdateOrderStatusDto } from "../../dto/update-order-status.dto";
import { ClientEntity } from "../../entities/client.entity";
import { OrderEntity } from "../../entities/order.entity";
import { OrderDishEntity } from "../../entities/order_dish.entity";
import { OrderStatus } from "../../enums/order-status.enum";
import { getOneDishFixture } from "../dishFixture/dish.fixture";



export function orderDishEntityFixture(): OrderDishEntity {
    const order_dish = new OrderDishEntity();
    order_dish.current_price = 100;
    order_dish.quantity = 5;
    order_dish.dish = getOneDishFixture();
    return order_dish;
}

export function clientEntityFixture(): ClientEntity {
    const client = new ClientEntity();
    client.name = "Walter White"; 
    client.address =  "308 Negra Arroyo LN Alburquerque, NM 87140"
    client.email = "walterwhite69@gmail.com";
    client.identification = "12312";
    return client;
}


export function orderEntityFixture(): OrderEntity {
    const order = new OrderEntity();

    order.bill = 150;
    order.generated_at = "today";
    order.id = "123";
    order.status = OrderStatus.PENDING;
    order.client = clientEntityFixture();
    order.order_dishes = []

    return order;
}

export function IncomingUpdateDto(): UpdateOrderStatusDto {
    return {
        order_id: "123",
        status: OrderStatus.ON_PROGRESS
    }
}