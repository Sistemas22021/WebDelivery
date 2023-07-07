import { OrderService } from '../order.service';
import { Test } from '@nestjs/testing';
import { DISHES, FetchDishFromArray } from '../../shared/producer/product.producer';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {IncomingOrderFixture, IncomingOrderFixtureFailed, IncomingOrderFixtureNotFound} from "./orderFixture/order.fixture"
import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';


describe('Order Services',() =>{
    
    let orderService: OrderService;


    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [OrderService]
        })
        .useMocker(token => {
            if (token === EventEmitter2) {
                return { emit: () => 'Enviado' }
            }
            if(token === FetchDishFromArray ){
                return { fetch: () => DISHES }
            }
        }).compile();
        orderService = moduleRef.get(OrderService);
    });


    it('should be define',() => {
        expect(orderService).toBeDefined();
    })
    it('should return Success Message',async () => {

        const received = await orderService.createOrder(IncomingOrderFixture()) 
        expect(received).toBe('Enviado exitosamente!')
    })

    it('should throw unproccessable enttity',async () => {
        try {
            await orderService.createOrder(IncomingOrderFixtureFailed());
        } catch (error) {
            expect(error).toBeInstanceOf(UnprocessableEntityException)
        }
    })
    it('should throw notfound',async () => {
        try {
            await orderService.createOrder(IncomingOrderFixtureNotFound());
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException)
        }
    })
})