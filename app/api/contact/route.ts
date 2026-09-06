import { NextResponse } from "next/server";

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

    // If RESEND_API_KEY is configured in env, send email via Resend
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
            to: process.env.CONTACT_EMAIL || "bariyarvaibhav@gmail.com",
            reply_to: email,
            subject: `[Project Atlas] New Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          }),
        });

        if (!res.ok) {
          console.warn("Resend API returned non-200:", await res.text());
        }
      } catch (err) {
        console.error("Resend error:", err);
      }
    }

    // If WEB3FORMS_ACCESS_KEY is configured, forward to Web3Forms
    if (process.env.WEB3FORMS_ACCESS_KEY) {
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: process.env.WEB3FORMS_ACCESS_KEY,
            name,
            email,
            message,
            from_name: "Project Atlas Portfolio",
          }),
        });
      } catch (err) {
        console.error("Web3Forms error:", err);
      }
    }

    // Log the message to server console for local testing and tracking
    console.log(`[CONTACT FORM MESSAGE RECEIVED]\nFrom: ${name} <${email}>\nMessage: ${message}\nTime: ${new Date().toISOString()}`);

    return NextResponse.json({
      success: true,
      message: "Message received successfully! I'll get back to you soon.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to process message." },
      { status: 500 }
    );
  }
}
