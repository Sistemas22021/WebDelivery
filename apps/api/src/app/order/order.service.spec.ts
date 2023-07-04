import { fixtureGenerateOrderDtoExample } from "../fixture/orders/order.fixture";
import {OrderService} from "./order.service"

import { Test } from '@nestjs/testing';
import { SenderOrderMail } from "../shared/classes/SenderOrderMail/SenderOrderMail.class";
describe('test the order service', () => {


  let service;
  let sender;


  beforeAll(async () => {
    
    
    sender = new SenderOrderMail();
    const actualTransport = await sender.makeTransport();
    jest
      .spyOn(actualTransport, 'sendMail')
      .mockResolvedValue({  rejected: [] });
    jest.spyOn(sender, 'makeTransport').mockResolvedValue(actualTransport);

    

    const app = await Test.createTestingModule({
      providers: [OrderService],
    }).compile();

    service = app.get<OrderService>(OrderService);
    });

    jest.spyOn(service,'senderOrder').mockResolvedValue(sender);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    it('Should return void', async () => {
      const mock_order = fixtureGenerateOrderDtoExample();
      
      expect(await service.createOrder(mock_order)).toBe(void 0);
    });
  
  });
  