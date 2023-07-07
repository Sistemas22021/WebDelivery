import { SenderOrderMail } from '../classes/sender-order-email.class'
import { OrderDataFixture } from './OrderDataFixture/order-data.fixture'

import { SentMessageFixture, TransporterFixture } from './transporter.fixture'
import { SenderResponse } from '../interfaces/sender-response.interface';
import { OrderData } from '../interfaces/order-data.interface';

describe('Sender Order Email',() => {
    let senderOrder: SenderOrderMail;
    let orderData: OrderData;
    beforeEach(async () => {
        senderOrder = new SenderOrderMail();
        orderData = OrderDataFixture();
    })


    it('should expect success response',async () => {

        const transporter = TransporterFixture();
        
        jest.spyOn(transporter,'sendMail').mockResolvedValue(SentMessageFixture());
        jest.spyOn(senderOrder as any, 'makeTransport').mockResolvedValue(transporter);
        jest.spyOn(senderOrder as any,'sendOrderToCompany').mockResolvedValue(true);

        const sended = await senderOrder.send(orderData);
        const sender_response: SenderResponse = {
            message: 'Order successfully placed',
            success: true
        }

        expect(sended).toStrictEqual(sender_response);
        
    })

    it('should expect failed transporter response', async () => {
        jest.spyOn(senderOrder as any, 'makeTransport').mockResolvedValue(null);
        const sended = await senderOrder.send(orderData);
        const sender_response: SenderResponse = {
            message: 'Transporter failed',
            success: false
        }
        expect(sended).toStrictEqual(sender_response);
    })
    it('should expect failed send order to company response', async () => {
        const transporter = TransporterFixture();
        
        jest.spyOn(transporter,'sendMail').mockResolvedValue(SentMessageFixture());
        jest.spyOn(senderOrder as any, 'makeTransport').mockResolvedValue(transporter);

        jest.spyOn(senderOrder as any,'sendOrderToCompany').mockResolvedValue(false);
        const sended = await senderOrder.send(orderData);
        const sender_response: SenderResponse = {
            message: 'Order has not been sent',
            success: false
        }
        expect(sended).toStrictEqual(sender_response);
    })
})
