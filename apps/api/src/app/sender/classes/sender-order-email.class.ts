import SMTPTransport from "nodemailer/lib/smtp-transport";
import { SenderOrder } from "../interfaces/sender-order.interface";
import { Transporter, createTransport } from "nodemailer";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { MailOptions } from "nodemailer/lib/json-transport";
import orderConfirmationTemplate from "../email-templates/order-confirmation.template";
import receivedOrderTemplate from "../email-templates/received-order.template";
import { OrderData } from "../interfaces/order-data.interface";
import { SenderResponse } from "../interfaces/sender-response.interface";

@Injectable()
export class SenderOrderMail implements SenderOrder{



    private company_email = "jesusfiguera20@gmail.com"



    private transporter: Transporter<SMTPTransport.SentMessageInfo>;


    private transporter_email: string;
    private transporter_email_password: string;
    private transporter_host: string;
    private transporter_port: number;
    private transporter_secure: boolean;

    constructor(){

        //Credenciales de donde el transporter enviara los correos.
        this.transporter_email = "secretfriend202212@gmail.com"
        this.transporter_email_password = "ekshkcoyaswjaley";



        //Valores de configuracion para el transporter.
        this.transporter_host = "smtp.gmail.com";
        this.transporter_port = 465;
        this.transporter_secure = true;
    }

    //Creacion del transporter. en caso de no poderse autenticar retornada nulo.
    private async makeTransport(): Promise<Transporter<SMTPTransport.SentMessageInfo> | null>{

        const transporter: Transporter<SMTPTransport.SentMessageInfo> = createTransport({
            host:this.transporter_host,
            port:this.transporter_port,
            secure: this.transporter_secure,
            auth: {
                user:this.transporter_email,
                pass:this.transporter_email_password
            }
        })
        const verification: boolean = await transporter.verify();

        if(!verification){ return null }

        return transporter
    }


    private async initializeTransporter(){
        this.transporter = await this.makeTransport();
    }

    private buildEmailOptions(from: string, to: string, subject: string, html: string): MailOptions{
        return { from, to, subject, html }
    } 


    //Envia el correo avisando que se ha realizado una orden al correo del restaurante.
    private async sendOrderToCompany(order: OrderData): Promise<boolean>{

        const template = receivedOrderTemplate(order);
        const subject = `Nueva orden generada`;
        const email_options = this.buildEmailOptions(this.transporter_email, this.company_email, subject, template);

        const result = await this.transporter.sendMail(email_options);

        return result.rejected.length === 0 ? true : false;
    }

    //Envia correo al cliente para confirmar su pedido.
    private async sendConfirmationOrderToClient(order: OrderData): Promise<boolean>{
        const template = orderConfirmationTemplate(order);
        const subject = "Los Pollos Hermanos - Confirmacion de Pedido";
        const email_options = this.buildEmailOptions(this.transporter_email, order.client_email, subject, template);
        
        const result = await this.transporter.sendMail(email_options);
        return result.rejected.length === 0;
    }

    makeResponse(message: string, success: boolean): SenderResponse {
        return {
            message, 
            success
        }
    }

    async sendOrder(order: OrderData): Promise<SenderResponse> {
        
        
        await this.initializeTransporter()
        if(!this.transporter) return this.makeResponse('Transporter failed', false);

        const order_received = await this.sendOrderToCompany(order);

        if(!order_received) return this.makeResponse('Order has not been sent', false);

        await this.sendConfirmationOrderToClient(order);

        return this.makeResponse('Order successfully placed', true);
    }
}