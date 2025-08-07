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
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background: linear-gradient(135deg, #232946 0%, #2d3250 100%);">
      <div style="background: linear-gradient(90deg, #4f8cff 0%, #a074ff 100%); padding: 32px 0; border-radius: 18px 18px 0 0; text-align: center; box-shadow: 0 4px 16px rgba(30,40,100,0.06);">
        <h1 style="color: #fff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -.5px;">
          🚀 New Contact Form Submission
        </h1>
      </div>
      <div style="background: rgba(255,255,255,0.96); padding: 32px 32px 24px; border-radius: 0 0 18px 18px; box-shadow: 0 1px 8px rgba(50,60,120,.03);">
        <h3 style="color: #6236ff; margin-top:0;">Contact Information</h3>
        <div style="margin-bottom: 8px;">
          <span style="font-weight: 600; color: #4f8cff;">Name:</span> ${
            formData.name
          }<br>
          <span style="font-weight: 600; color: #a074ff;">Email:</span> ${
            formData.email
          }<br>
          ${
            formData.phone
              ? `<span style="font-weight:600; color:#36ffb0;">Phone:</span> ${formData.phone}<br>`
              : ""
          }
          ${
            formData.company
              ? `<span style="font-weight:600; color:#fa70b5;">Company:</span> ${formData.company}<br>`
              : ""
          }
        </div>
        <h3 style="color:#4f8cff">Subject</h3>
        <p style="margin-bottom: 0.5em; color:#222;">${formData.subject}</p>
        <h3 style="color: #ffb347;">Message</h3>
        <div style="background: linear-gradient(90deg, #f3f5fb 0%, #f2e6fa 100%); border-left: 4px solid #764ba2; margin: 12px 0 24px; padding: 14px 16px; border-radius: 8px 0 0 8px; color:#444;">
          <span style="white-space: pre-wrap;">${formData.message}</span>
        </div>
        <hr style="margin: 28px 0 12px; border: none; border-top: 1px solid #eee;" />
        <div style="font-size: 12px; color: #777;">Received on ${new Date().toLocaleString()}</div>
      </div>
    </div>
  `;

  // 📩 Template for User (Confirmation)
  const userHtml = `
    <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #232946 0%, #2d3250 100%);">
      <div style="background: linear-gradient(90deg, #4f8cff 0%, #a074ff 100%); padding: 28px 0 22px; text-align: center; border-radius: 18px 18px 0 0; box-shadow: 0 4px 16px rgba(30,40,100,0.13);">
        <h1 style="color:#fff; margin:0; font-size:26px; font-weight:800;">Thank You, ${
          formData.name
        }!</h1>
      </div>
      <div style="background:rgba(255,255,255,0.97); padding:30px 28px 22px; border-radius:0 0 18px 18px; box-shadow:0 4px 14px rgba(80,90,185,0.06);">
        <p style="margin-top: 0;">
          We’ve received your message regarding <span style="font-weight:600;color:#4f8cff;">${
            formData.subject
          }</span>.
        </p>
        <p>Here’s a copy of your message:</p>
        <blockquote style="background:linear-gradient(90deg,#f3f5fb 0%,#e8f0fd 100%);border-left:4px solid #4f8cff;margin:12px 0 24px;padding:12px 18px;color:#333;border-radius:10px 0 0 10px;">
          ${formData.message}
        </blockquote>
        <p style="margin-bottom:0;">We’ll get back to you as soon as possible. Stay connected!</p>
        <hr style="margin: 24px 0 10px; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 11.5px; color: #888; text-align: center;">
          Sent from <span style="font-weight:500;color:#764ba2;">Adesh Yearanty’s Portfolio</span> &bull; ${new Date().toLocaleDateString()}
        </p>
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
