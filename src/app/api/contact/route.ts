// app/api/contact/route.ts

import { NextRequest, NextResponse } from "next/server";
import { sendContactFormEmail } from "@/lib/mailer";
import clientPromise from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();

    const { name, email, subject, message, phone, company } = formData;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("portfolio");
    const contacts = db.collection("contacts");

    const contactDocument = {
      name,
      email,
      subject,
      message,
      phone,
      company,
      createdAt: new Date(),
      status: "new",
    };

    await contacts.insertOne(contactDocument);

    await sendContactFormEmail(contactDocument);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error in API:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
