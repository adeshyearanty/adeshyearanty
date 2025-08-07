"use server";

import nodemailer from "nodemailer";
import { Attachment } from "nodemailer/lib/mailer";

const SMTP_SERVER_HOST =
  process.env.NEXT_PUBLIC_SMTP_SERVER_HOST || "smtp.gmail.com";
const SMTP_SERVER_USERNAME = process.env.NEXT_PUBLIC_SMTP_SERVER_USER || "";
const SMTP_SERVER_PASSWORD = process.env.NEXT_PUBLIC_SMTP_SERVER_PASS || "";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: false,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendMail({
  sendTo,
  cc,
  subject,
  html,
  attachments,
}: {
  sendTo?: string;
  cc?: string[];
  subject: string;
  html?: string;
  attachments?: Attachment[];
}) {
  try {
    await transporter.verify();
  } catch (error) {
    console.error("Transporter verification failed", error);
    return;
  }

  const mailOptions = {
    from: SMTP_SERVER_USERNAME,
    to: sendTo,
    cc: cc ?? [],
    subject,
    html: html ?? "",
    attachments: attachments ?? [],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message Sent", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export async function sendContactFormEmail(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
}) {
  // 📩 Template for Admin (You)
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
      </div>
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px;">
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${formData.name}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        ${
          formData.phone
            ? `<p><strong>Phone:</strong> ${formData.phone}</p>`
            : ""
        }
        ${
          formData.company
            ? `<p><strong>Company:</strong> ${formData.company}</p>`
            : ""
        }
        <h3>Subject</h3>
        <p>${formData.subject}</p>
        <h3>Message</h3>
        <p style="white-space: pre-wrap;">${formData.message}</p>
        <hr />
        <p style="font-size: 12px; color: gray;">Received on ${new Date().toLocaleString()}</p>
      </div>
    </div>
  `;

  // 📩 Template for User (Confirmation)
  const userHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f3f3f3;">
      <div style="background-color: #667eea; padding: 25px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0;">Thank You, ${formData.name}!</h1>
      </div>
      <div style="background-color: white; padding: 25px; border-radius: 0 0 10px 10px;">
        <p>We’ve received your message regarding <strong>${
          formData.subject
        }</strong>.</p>
        <p>Here’s a copy of your message:</p>
        <blockquote style="border-left: 4px solid #667eea; padding-left: 10px; margin: 10px 0; color: #555;">
          ${formData.message}
        </blockquote>
        <p>We’ll get back to you as soon as possible. Stay connected!</p>
        <hr />
        <p style="font-size: 12px; color: gray; text-align: center;">Sent from Adesh Yearanty’s Portfolio • ${new Date().toLocaleDateString()}</p>
      </div>
    </div>
  `;

  // Send to yourself
  await sendMail({
    sendTo: SMTP_SERVER_USERNAME,
    subject: `Portfolio Contact: ${formData.subject}`,
    html: adminHtml,
  });

  // Send confirmation to user
  return await sendMail({
    sendTo: formData.email,
    subject: `Thanks for contacting me, ${formData.name}!`,
    html: userHtml,
  });
}
