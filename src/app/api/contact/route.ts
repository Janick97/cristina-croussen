import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { name, email, telefon, nachricht, datenschutz } = data;

    if (!name || !email || !nachricht || !datenschutz) {
      return NextResponse.json(
        { error: "Bitte füllen Sie alle Pflichtfelder aus." },
        { status: 400 }
      );
    }

    await sendMail({
      subject: `Neue Kontaktanfrage von ${name}`,
      replyTo: email,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Name</td><td style="padding:8px;border-bottom:1px solid #eee">${name}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">E-Mail</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Telefon</td><td style="padding:8px;border-bottom:1px solid #eee">${telefon || "–"}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Nachricht</td><td style="padding:8px;border-bottom:1px solid #eee">${nachricht.replace(/\n/g, "<br>")}</td></tr>
        </table>
        <p style="color:#999;font-size:12px;margin-top:20px">Gesendet über das Kontaktformular der Website.</p>
      `,
    });

    return NextResponse.json(
      { message: "Nachricht erfolgreich gesendet." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 }
    );
  }
}
