import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IOtp extends Document {
  email: string;
  otp: string;
  verified: boolean;
  createdAt: Date;
}

const OtpSchema = new Schema<IOtp>({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, expires: 600 }, // 10 min TTL
});

export default models.Otp || model<IOtp>('Otp', OtpSchema); 