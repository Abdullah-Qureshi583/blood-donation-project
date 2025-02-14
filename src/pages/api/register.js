import { auth, db } from "../../utlis/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const {
    fullName,
    email,
    password,
    bloodGroup,
    mobileNumber,
    lastDonationDate,
    province,
    district,
    tehsil,
    unionCouncil,
    village,
  } = req.body;

  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Store user details in Firestore
    await setDoc(doc(db, "donors", user.uid), {
      fullName,
      email,
      bloodGroup,
      mobileNumber,
      province,
      district,
      tehsil,
      unionCouncil,
      village,
      lastDonationDate,
      isActive:
        new Date(lastDonationDate) <
        new Date(Date.now() - 110 * 24 * 60 * 60 * 1000),
      createdAt: new Date(),
    });

    res
      .status(201)
      .json({ message: "User registered successfully", userId: user.uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
