import { OrderData } from "../interfaces/order-data.interface";
import { SenderOrder } from "../interfaces/sender-order.interface";
import { SenderResponse } from "../interfaces/sender-response.interface";
import TelegramBot from 'node-telegram-bot-api';
import receivedOrderTelegramTemplate from "../telegram-templates/received-order-telegram.template";

export default class SenderOrderTelegram implements SenderOrder {

    private telegram_bot: TelegramBot;
    private TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    private CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    constructor() {
        this.telegram_bot = new TelegramBot(this.TOKEN);
    }

    makeResponse(message: string, success: boolean): SenderResponse {
        return {
            message, success
        }
    }
    async send(order: OrderData): Promise<SenderResponse> {
        try {
            await this.telegram_bot.sendMessage(
                Number(this.CHAT_ID),
                receivedOrderTelegramTemplate(order)
            )
            return this.makeResponse('',true);
        } catch (error) {
            return this.makeResponse('Hubo un error enviando la notificacion por telegram',false);
        }
    }
}