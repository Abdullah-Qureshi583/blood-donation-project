import nodemailer from "nodemailer";

export async function sendOTPEmail(to: string, otp: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: "BloodLife <mabdullahmubeen583@gmail.com>",
    to,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
    html: `<p>Your OTP code is: <b>${otp}</b></p>`,
  });
}
