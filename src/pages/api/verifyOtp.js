import { db } from "@/lib/firebaseAdmin";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const { phone, otp } = req.body;
  if (!phone || !otp)
    return res.status(400).json({ message: "Phone and OTP are required" });

  const otpDoc = await db.collection("otps").doc(phone).get();
  if (!otpDoc.exists)
    return res.status(400).json({ message: "OTP not found or expired" });

  const { otp: storedOtp, expiresAt } = otpDoc.data();

  if (Date.now() > expiresAt) {
    await db.collection("otps").doc(phone).delete();
    return res.status(400).json({ message: "OTP expired" });
  }

  if (otp !== storedOtp)
    return res.status(400).json({ message: "Invalid OTP" });

  await db.collection("otps").doc(phone).delete(); // Delete OTP after successful verification

  return res.status(200).json({ message: "OTP verified successfully" });
}
