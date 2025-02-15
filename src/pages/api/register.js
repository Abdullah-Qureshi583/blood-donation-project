import { db } from "../../utlis/firebase";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // Generates a unique ID

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const {
    fullName,
    bloodGroup,
    mobileNumber,
    lastDonationDate,
    province,
    district,
    tehsil,
    unionCouncil,
    village,
  } = req.body;

  // if (!fullName || !bloodGroup || !mobileNumber || !lastDonationDate)
  //   return res.status(400).json({ error: "Missing required fields" });

  const userId = uuidv4(); // Generate unique ID

  try {
    const lastDonation = new Date(lastDonationDate);
    const isActive =
      lastDonation < new Date(Date.now() - 110 * 24 * 60 * 60 * 1000);

    await setDoc(doc(db, "donors", userId), {
      fullName,
      bloodGroup,
      mobileNumber,
      province,
      district,
      tehsil,
      unionCouncil,
      village,
      lastDonationDate: Timestamp.fromDate(lastDonation),
      isActive,
      createdAt: Timestamp.now(),
    });

    res.status(200).json({ message: "User registered successfully", userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
