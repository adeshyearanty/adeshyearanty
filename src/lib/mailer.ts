"use server";

import nodemailer from "nodemailer";
import { Attachment } from "nodemailer/lib/mailer";

const SMTP_SERVER_HOST = "smtp.gmail.com";
const SMTP_SERVER_USERNAME = "adeshyearantycodes@gmail.com";
const SMTP_SERVER_PASSWORD = "nmqsalfyjrizzksd";

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
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
      </div>
      
      <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div style="margin-bottom: 20px;">
          <h3 style="color: #333; margin-bottom: 10px; border-bottom: 2px solid #667eea; padding-bottom: 5px;">Contact Information</h3>
          <p style="margin: 8px 0;"><strong>Name:</strong> ${formData.name}</p>
          <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${
            formData.email
          }" style="color: #667eea;">${formData.email}</a></p>
          ${
            formData.phone
              ? `<p style="margin: 8px 0;"><strong>Phone:</strong> ${formData.phone}</p>`
              : ""
          }
          ${
            formData.company
              ? `<p style="margin: 8px 0;"><strong>Company:</strong> ${formData.company}</p>`
              : ""
          }
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #333; margin-bottom: 10px; border-bottom: 2px solid #667eea; padding-bottom: 5px;">Subject</h3>
          <p style="margin: 8px 0; font-size: 16px; color: #555;">${
            formData.subject
          }</p>
        </div>
        
        <div>
          <h3 style="color: #333; margin-bottom: 10px; border-bottom: 2px solid #667eea; padding-bottom: 5px;">Message</h3>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
            <p style="margin: 0; line-height: 1.6; color: #555; white-space: pre-wrap;">${
              formData.message
            }</p>
          </div>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
          <p style="color: #888; font-size: 14px; margin: 0;">
            This email was sent from your portfolio contact form.<br>
            Received on ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  `;

  await sendMail({
    sendTo: SMTP_SERVER_USERNAME,
    subject: `Portfolio Contact: ${formData.subject}`,
    html: emailHtml,
  });

  return await sendMail({
    sendTo: formData.email,
    subject: `Portfolio Contact: ${formData.subject}`,
    html: emailHtml,
  });
}
