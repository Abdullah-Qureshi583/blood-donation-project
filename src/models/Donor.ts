import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IDonor extends Document {
  // userId: mongoose.Types.ObjectId; // Reference to User
  name: string;
  bloodGroup: string;
  country: string;
  province: string;
  district?: string;
  tehsil?: string;
  unionCouncil?: string;
  village?: string;
  lastDonation: string;
  isActive: boolean;
  isPublic: boolean;
  contact?: string;
  email: string;
  fatherName?: string;
}

const DonorSchema = new Schema<IDonor>({
  // userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  country: { type: String, default:"Pakistan" },
  province: { type: String, required: true },
  district: String,
  tehsil: String,
  unionCouncil: String,
  village: String,
  lastDonation: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isPublic: { type: Boolean, default: true },
  contact: String,
  email: { type: String, required: true },
  fatherName: String,
}, { timestamps: true });

export default models.Donor || model<IDonor>('Donor', DonorSchema);
