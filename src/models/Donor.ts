import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IDonor extends Document {
  name: string;
  bloodGroup: string;
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
}

const DonorSchema = new Schema<IDonor>({
  name: { type: String, required: true },
  bloodGroup: { type: String, required: true },
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
}, { timestamps: true });

export default models.Donor || model<IDonor>('Donor', DonorSchema);
