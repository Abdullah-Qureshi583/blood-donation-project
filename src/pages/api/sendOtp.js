import { db } from "@/lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const { phone } = req.body;
  if (!phone)
    return res.status(400).json({ message: "Phone number is required" });

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes

  // Store OTP in Firestore
  await db.collection("otps").doc(phone).set({ otp, expiresAt });

  // Simulate sending OTP via SMS (Use Twilio or other services in production)
  console.log(`OTP for ${phone}: ${otp}`);

  return res.status(200).json({ message: "OTP sent successfully" });
}
