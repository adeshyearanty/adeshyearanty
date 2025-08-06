export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
  createdAt: Date;
  status: "new" | "read" | "replied";
}

export const contactSchema = {
  name: { type: "string", required: true, minLength: 2, maxLength: 100 },
  email: {
    type: "string",
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  subject: { type: "string", required: true, minLength: 5, maxLength: 200 },
  message: { type: "string", required: true, minLength: 10, maxLength: 2000 },
  phone: { type: "string", required: false, maxLength: 20 },
  company: { type: "string", required: false, maxLength: 100 },
};
