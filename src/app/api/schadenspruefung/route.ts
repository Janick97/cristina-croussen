import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const telefon = formData.get("telefon") as string;
    const versicherungsart = formData.get("versicherungsart") as string;
    const beschreibung = formData.get("beschreibung") as string;
    const datenschutz = formData.get("datenschutz") as string;

    if (!name || !email || !versicherungsart || !beschreibung || datenschutz !== "true") {
      return NextResponse.json(
        { error: "Bitte füllen Sie alle Pflichtfelder aus." },
        { status: 400 }
      );
    }

    const dokumente = formData.getAll("dokumente") as File[];
    const fileNames = dokumente
      .filter((f) => f.size > 0)
      .map((f) => f.name);

    await sendMail({
      subject: `Neue Schadensprüfung von ${name} – ${versicherungsart}`,
      replyTo: email,
      html: `
        <h2>Neue Schadensprüfung</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Name</td><td style="padding:8px;border-bottom:1px solid #eee">${name}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">E-Mail</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Telefon</td><td style="padding:8px;border-bottom:1px solid #eee">${telefon || "–"}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Versicherungsart</td><td style="padding:8px;border-bottom:1px solid #eee">${versicherungsart}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Beschreibung</td><td style="padding:8px;border-bottom:1px solid #eee">${beschreibung.replace(/\n/g, "<br>")}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold">Dokumente</td><td style="padding:8px;border-bottom:1px solid #eee">${fileNames.length > 0 ? fileNames.join(", ") : "Keine"}</td></tr>
        </table>
        <p style="color:#999;font-size:12px;margin-top:20px">Gesendet über das Schadensprüfungs-Formular der Website.</p>
      `,
    });

    return NextResponse.json(
      { message: "Schadensmeldung erfolgreich übermittelt." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Schadensprüfung form error:", error);
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 }
    );
  }
}
