// utils/mail.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "mail.theleadersfirst.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: process.env.MAIL_USER || "no-reply-otp@theleadersfirst.com",
    pass: process.env.MAIL_PASS, // put real password in .env
  },
  tls: {
    rejectUnauthorized: false, // once stable, try removing this
  },
});

export async function sendEmail(to, subject, html) {
  return transporter.sendMail({
    from: `"The Leaders First" <${process.env.MAIL_USER || "no-reply-otp@theleadersfirst.com"}>`,
    to,
    subject,
    html,
  });
}
