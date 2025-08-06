"use server";

import clientPromise from "@/lib/mongodb";
import { ContactFormData } from "@/lib/models/Contact";
import { sendContactFormEmail } from "@/lib/mailer";

export async function submitContactForm(formData: FormData) {
  try {
    // Extract form data
    const contactData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
      phone: (formData.get("phone") as string) || undefined,
      company: (formData.get("company") as string) || undefined,
    };

    // Basic validation
    if (
      !contactData.name ||
      !contactData.email ||
      !contactData.subject ||
      !contactData.message
    ) {
      return {
        success: false,
        message: "Please fill in all required fields.",
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("portfolio");
    const collection = db.collection("contacts");

    // Prepare document for MongoDB
    const contactDocument: ContactFormData = {
      ...contactData,
      createdAt: new Date(),
      status: "new",
    };

    // Save to MongoDB
    const result = await collection.insertOne(contactDocument);

    if (!result.insertedId) {
      throw new Error("Failed to save contact form data");
    }

    // Send email notification
    await sendContactFormEmail(contactData);

    return {
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
      id: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      success: false,
      message:
        "Sorry, there was an error sending your message. Please try again later.",
    };
  }
}
