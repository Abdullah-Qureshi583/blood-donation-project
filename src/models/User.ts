import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IDonorProfile {
  bloodGroup: string;
  country: string;
  province: string;
  district?: string;
  lastDonation: Date | null;
  isActive: boolean;
  contact?: string;
}

export interface IUser extends Document {
  name: string;
  lastName: string;
  email: string;
  password?: string;
  phone?: string;
  provider?: string;
  emailVerified?: boolean;
  image?: string;
  donors: IDonorProfile[];
}

const DonorProfileSchema = new Schema({
  bloodGroup: { type: String, required: true },
  country: { type: String, default: "Pakistan" },
  province: { type: String, required: true },
  district: { type: String, required: true },
  lastDonation: { type: Date, default: null },
  isActive: { type: Boolean, default: true },
  contact: String,
}, { timestamps: true });

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: String, // Optional for OAuth providers
  phone: String,
  provider: { type: String, default: 'credentials' },
  emailVerified: { type: Boolean, default: false },
  image: String,
  donors: { type: [DonorProfileSchema], default: [] }
}, { timestamps: true });

// Create a compound index to ensure one blood group per location for each user
UserSchema.index(
  { 
    'donors.bloodGroup': 1, 
    'donors.province': 1, 
    'donors.district': 1 
  },
  { 
    unique: true,
    name: "unique_user_bloodgroup_location",
    partialFilterExpression: { 'donors': { $exists: true } }
  }
);

export default models.User || model<IUser>('User', UserSchema); 