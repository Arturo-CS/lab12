"use server";
import nodemailer from 'nodemailer';

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "465360e80c24d9",
    pass: "24303a75f77aa6"
  }
});

interface EmailOptions {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
  }
  
export const sendEmail = async ({ from, to, subject, text, html }: EmailOptions) => {
    try {
        const info = await transport.sendMail({
        from,
        to,
        subject,
        text,
        html
        });
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email: %s", error);
        throw error;
    }
};