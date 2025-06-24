import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IDonor extends Document {
  userId: mongoose.Types.ObjectId;
  bloodGroup: string;
  country: string;
  province: string;
  district?: string;
  tehsil?: string;
  unionCouncil?: string;
  village?: string;
  lastDonation: Date | null;
  isActive: boolean;
  isPublic: boolean;
  contact?: string;
  email: string;
}

const DonorSchema = new Schema<IDonor>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bloodGroup: { type: String, required: true },
  country: { type: String, default: "Pakistan" },
  province: { type: String, required: true },
  district: String,
  tehsil: String,
  unionCouncil: String,
  village: String,
  lastDonation: { type: Date, default: null },
  isActive: { type: Boolean, default: true },
  isPublic: { type: Boolean, default: true },
  contact: String,
  email: { type: String, required: true }
}, { timestamps: true });

// Create a compound index to ensure one blood group per user per location
DonorSchema.index(
  { 
    userId: 1, 
    bloodGroup: 1, 
    province: 1, 
    district: 1, 
    tehsil: 1 
  }, 
  { unique: true }
);

export default models.Donor || model<IDonor>('Donor', DonorSchema);
