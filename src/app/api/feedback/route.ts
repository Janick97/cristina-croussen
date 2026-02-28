import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const { stars, gefielt, verbessern, gefunden, gutGefallen, gefehlt } = await request.json();

    if (!stars) {
      return NextResponse.json({ error: "Sternebewertung fehlt." }, { status: 400 });
    }

    const starEmojis = "⭐".repeat(stars);

    await sendMail({
      subject: `Website-Feedback: ${starEmojis} (${stars}/5 Sterne)`,
      html: `
        <h2 style="color:#D9A397">Neues Website-Feedback</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif">
          <tr>
            <td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold;width:40%">Gesamtbewertung</td>
            <td style="padding:10px;border-bottom:1px solid #eee">${starEmojis} (${stars}/5)</td>
          </tr>
          <tr>
            <td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold">Gefällt besonders</td>
            <td style="padding:10px;border-bottom:1px solid #eee">${gefielt || "–"}</td>
          </tr>
          <tr>
            <td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold">Verbesserungsideen</td>
            <td style="padding:10px;border-bottom:1px solid #eee">${verbessern || "–"}</td>
          </tr>
          <tr>
            <td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold">Gesuchtes gefunden?</td>
            <td style="padding:10px;border-bottom:1px solid #eee">${gefunden || "–"}</td>
          </tr>
          <tr>
            <td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold">Was hat gut gefallen?</td>
            <td style="padding:10px;border-bottom:1px solid #eee">${gutGefallen?.replace(/\n/g, "<br>") || "–"}</td>
          </tr>
          <tr>
            <td style="padding:10px;font-weight:bold">Was hat gefehlt?</td>
            <td style="padding:10px">${gefehlt?.replace(/\n/g, "<br>") || "–"}</td>
          </tr>
        </table>
        <p style="color:#999;font-size:12px;margin-top:20px">Anonym über das Feedback-Formular auf cristinacroussen.de</p>
      `,
    });

    return NextResponse.json({ message: "Feedback gesendet." }, { status: 200 });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json({ error: "Interner Serverfehler." }, { status: 500 });
  }
}
