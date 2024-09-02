import nodemailer from "nodemailer";

export async function createTransporter() {
  return nodemailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 2525,
    auth: {
      user: process.env.ELASTIC_EMAIL_USER,
      pass: process.env.ELASTIC_EMAIL_API_KEY,
    },
  });
}
