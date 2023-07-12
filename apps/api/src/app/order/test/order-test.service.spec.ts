import { Test, TestingModule } from "@nestjs/testing";
import { OrderService } from "../order.service"
import { DishEntity } from "../../dish/entities/dish.entity";
import { getRepositoryToken } from "@nestjs/typeorm/dist";
import { ClientEntity } from "../entities/client.entity";
import { OrderDishEntity } from "../entities/order_dish.entity";
import { OrderEntity } from "../entities/order.entity";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { getDishesFixture } from "./dishFixture/dish.fixture"
import { IncomingOrderFixture, IncomingOrderFixtureFailed, IncomingOrderFixtureNotFound } from "./orderFixture/order.fixture"
import { NotFoundException, UnprocessableEntityException } from "@nestjs/common";

import { IncomingUpdateDto, orderEntityFixture } from "./updateOrderFixture/update-order.fixture"
import { Repository } from "typeorm";
describe('orderService', () => {
    let service: OrderService;

   let orderRepository: Repository<OrderEntity>;

    const DISH_REPOSITORY_TOKEN = getRepositoryToken(DishEntity);
    const CLIENT_REPOSITORY_TOKEN = getRepositoryToken(ClientEntity);
    const ORDER_DISH_REPOSITORY_TOKEN = getRepositoryToken(OrderDishEntity);
    const ORDER_REPOSITORY_TOKEN = getRepositoryToken(OrderEntity);


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrderService,
                { provide: DISH_REPOSITORY_TOKEN,useValue: {
                    find: jest.fn(() => getDishesFixture())
                } },
                { provide: CLIENT_REPOSITORY_TOKEN,useValue: {
                    save: jest.fn(),
                    findOneBy: jest.fn()
                } },
                { provide: ORDER_DISH_REPOSITORY_TOKEN,useValue: {
                    save: jest.fn()
                } },
                { provide: ORDER_REPOSITORY_TOKEN,useValue: {
                    save: jest.fn(),
                    findOneBy: jest.fn(() => orderEntityFixture())
                } },
                { provide: EventEmitter2, useValue: { 
                    emit: jest.fn()
                 } }
            ]
        }).compile();

        service = module.get<OrderService>(OrderService);
        orderRepository = module.get<Repository<OrderEntity>>(ORDER_REPOSITORY_TOKEN);
    })

    it('should be defined', () => {
        expect(service).toBeDefined();
    })
    it('should created an order',async () => {
        const fixture = IncomingOrderFixture();
        const result = await service.createOrder(fixture);

        expect(result).toBe('Enviado exitosamente!');
    })
    it('should return unprocessable entity',async () => {
        const fixture = IncomingOrderFixtureFailed();
        try {
            await service.createOrder(fixture);
        } catch (error) {
            expect(error).toBeInstanceOf(UnprocessableEntityException)
        }
    })
    it('should throw not found',async () => {
        const fixture = IncomingOrderFixtureNotFound();
        try {
            await service.createOrder(fixture);
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException)
        }
    })

    it('should update order', async() => {
        const fixture = IncomingUpdateDto();

        const result = await service.updateOrderStatus(fixture)
    
        expect(result).toBe('Estado actualizado');
    })

    it('should throw not found', async() => {

        jest.spyOn(orderRepository,'findOneBy').mockResolvedValueOnce(null);
        const fixture = IncomingUpdateDto();

        try {
            await service.updateOrderStatus(fixture)
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
        }
    })
})