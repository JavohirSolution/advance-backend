import nodemailer, { Transporter } from "nodemailer"
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import dotenv from "dotenv";
dotenv.config()

class MailService {
    transport: Transporter
    constructor() {
        const smtpConfig: SMTPTransport.Options = {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true', // Ensure secure is boolean
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSPORT,
            },
        };

        this.transport = nodemailer.createTransport(smtpConfig);
    }

    async sendMail(email: string, activationLink: any) {
        await this.transport.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: `Activation account link ${activationLink}`,
            html: `
                <div>
                    <a href="${activationLink}">Click to activate account</a>
                </div>
            `
        })
    }
}


export default new MailService()