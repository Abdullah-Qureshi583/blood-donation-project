import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IRequest extends Document {
  patientName: string;
  hospital: string;
  requiredBloodGroup: string;
  dateNeeded: string;
  contact: string;
  status: 'pending' | 'fulfilled';
}

const RequestSchema = new Schema<IRequest>({
  patientName: { type: String, required: true },
  hospital: { type: String, required: true },
  requiredBloodGroup: { type: String, required: true },
  dateNeeded: { type: String, required: true },
  contact: { type: String, required: true },
  status: { type: String, enum: ['pending', 'fulfilled'], default: 'pending' },
}, { timestamps: true });

export default models.Request || model<IRequest>('Request', RequestSchema); 