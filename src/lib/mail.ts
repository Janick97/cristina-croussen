import nodemailer from "nodemailer";

function createTransporter() {
  const port = Number(process.env.SMTP_PORT) || 587;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  });
}

interface MailOptions {
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendMail({ subject, html, replyTo }: MailOptions) {
  console.log("Sending mail via", process.env.SMTP_HOST, "port", process.env.SMTP_PORT, "user", process.env.SMTP_USER);

  const transporter = createTransporter();

  try {
    const info = await transporter.sendMail({
      from: `"Website Kontakt" <${process.env.SMTP_USER}>`,
      to: "kontakt@cristinacroussen.de",
      subject,
      html,
      replyTo,
    });
    console.log("Mail sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("SMTP Error:", error);
    throw error;
  }
}
