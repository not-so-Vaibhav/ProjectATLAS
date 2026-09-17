import { NextResponse } from "next/server";

const TARGET_EMAIL = process.env.CONTACT_EMAIL || "bariyarvaibhav@gmail.com";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    let emailDelivered = false;
    let needsActivation = false;
    const errors: string[] = [];

    // ── 1. Resend API (If RESEND_API_KEY is configured) ─────────────
    if (process.env.RESEND_API_KEY) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || "Atlas Contact <onboarding@resend.dev>",
            to: TARGET_EMAIL,
            reply_to: email,
            subject: `[Project Atlas] New Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          }),
        });

        if (res.ok) {
          emailDelivered = true;
          console.log("[Resend] Email sent successfully to", TARGET_EMAIL);
        } else {
          const errText = await res.text();
          console.warn("[Resend] API returned non-200:", errText);
          errors.push(`Resend: ${errText}`);
        }
      } catch (err: any) {
        console.error("[Resend] error:", err);
        errors.push(`Resend: ${err.message}`);
      }
    }

    // ── 2. FormSubmit (Free automated forwarding to TARGET_EMAIL) ───
    try {
      const fsRes = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: "https://projectatlas.dev",
          Referer: "https://projectatlas.dev/",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `[Project Atlas] Message from ${name} (${email})`,
          _replyto: email,
          _template: "table",
        }),
      });

      const fsData = await fsRes.json().catch(() => null);
      if (fsData) {
        if (fsData.success === "true" || fsData.success === true) {
          emailDelivered = true;
          console.log("[FormSubmit] Message successfully forwarded to", TARGET_EMAIL);
        } else if (fsData.message && fsData.message.includes("Activation")) {
          needsActivation = true;
          console.log("[FormSubmit] Activation email sent to", TARGET_EMAIL);
        }
      }
    } catch (err: any) {
      console.error("[FormSubmit] error:", err);
      errors.push(`FormSubmit: ${err.message}`);
    }

    // ── 3. Web3Forms (If WEB3FORMS_ACCESS_KEY is configured) ────────
    if (process.env.WEB3FORMS_ACCESS_KEY) {
      try {
        const w3Res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            name,
            email,
            message,
            from_name: "Project Atlas Portfolio",
            subject: `[Project Atlas] Message from ${name}`,
          }),
        });

        const w3Data = await w3Res.json().catch(() => null);
        if (w3Data && w3Data.success) {
          emailDelivered = true;
          console.log("[Web3Forms] Message sent successfully.");
        }
      } catch (err: any) {
        console.error("[Web3Forms] error:", err);
      }
    }

    // Always log to server console for local testing and tracking
    console.log(
      `\n========================================\n` +
      `[CONTACT MESSAGE RECEIVED]\n` +
      `From: ${name} <${email}>\n` +
      `To: ${TARGET_EMAIL}\n` +
      `Message:\n${message}\n` +
      `Time: ${new Date().toISOString()}\n` +
      `Delivered: ${emailDelivered} | Activation Pending: ${needsActivation}\n` +
      `========================================\n`
    );

    return NextResponse.json({
      success: true,
      delivered: emailDelivered,
      needsActivation,
      message: needsActivation
        ? "Message recorded! Please check your Gmail (bariyarvaibhav@gmail.com) and click 'Activate Form' once to enable instant email alerts."
        : "Message received successfully! I'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to process message." },
      { status: 500 }
    );
  }
}

