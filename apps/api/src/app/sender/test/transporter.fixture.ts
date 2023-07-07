import { Transporter, createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export function TransporterFixture(): Transporter<SMTPTransport.SentMessageInfo> {
    return createTransport({
        host:'',
        port:5000,
        secure: true,
        auth: {
            user:'',
            pass:''
        }
    })
}

export function SentMessageFixture(): SMTPTransport.SentMessageInfo {
    return {
        accepted: [],
        envelope: null,
        messageId: null,
        pending: null,
        rejected: [],
        response: ''
    }
}