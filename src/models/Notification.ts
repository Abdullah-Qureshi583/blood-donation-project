import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface INotification extends Document {
  message: string;
  read: boolean;
  createdAt: Date;
  donorId?: string;
  requestId?: string;
}

const NotificationSchema = new Schema<INotification>({
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  donorId: { type: Schema.Types.ObjectId, ref: 'Donor' },
  requestId: { type: Schema.Types.ObjectId, ref: 'Request' },
  createdAt: { type: Date, default: Date.now },
});

export default models.Notification || model<INotification>('Notification', NotificationSchema); 