import { SenderOrderMail } from './SenderOrderMail.class';
import { fixtureGenerateOrderExample } from '../../../fixture/orders/order.fixture';
import { Transporter } from 'nodemailer';

describe('Test the sender order mail', () => {
  let sender;

  beforeEach(async () => {
    sender = new SenderOrderMail();
    const actualTransport = await sender.makeTransport();
    jest
      .spyOn(actualTransport, 'sendMail')
      .mockResolvedValue({  rejected: [] });
    jest.spyOn(sender, 'makeTransport').mockResolvedValue(actualTransport);
  });

  it('Should return nothing', async () => {
    const mock_order = fixtureGenerateOrderExample();
    expect(await sender.sendOrder(mock_order)).toBe(void 0);
  });
});
