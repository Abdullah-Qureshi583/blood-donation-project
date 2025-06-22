import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  provider?: string;
  emailVerified?: boolean;
  image?: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: String, // Optional for OAuth providers
  phone: String,
  provider: { type: String, default: 'credentials' },
  emailVerified: { type: Boolean, default: false },
  image: String,
}, { timestamps: true });

export default models.User || model<IUser>('User', UserSchema); 