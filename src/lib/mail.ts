import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface MailOptions {
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendMail({ subject, html, replyTo }: MailOptions) {
  await transporter.sendMail({
    from: `"Website Kontakt" <${process.env.SMTP_USER}>`,
    to: "kontakt@cristinacroussen.de",
    subject,
    html,
    replyTo,
  });
}
