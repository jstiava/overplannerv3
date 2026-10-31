
import { SendEmailCommand, SESv2Client } from '@aws-sdk/client-sesv2'
import nodemailer from 'nodemailer'



export const sesClient = new SESv2Client({
    region: process.env.AWS_SES_REGION ?? 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_SES_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SES_SECRET_KEY!,
    },
})


export const NodemailerEmailTransporter = nodemailer.createTransport({
    SES: {
        sesClient,
        SendEmailCommand,
    },
})
