import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface INotification extends Document {
  message: string;
  read: boolean;
  createdAt: Date;
  userId: mongoose.Types.ObjectId;
  donorProfileId?: mongoose.Types.ObjectId;
  requestId?: mongoose.Types.ObjectId;
}

const NotificationSchema = new Schema<INotification>({
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  donorProfileId: { type: Schema.Types.ObjectId },
  requestId: { type: Schema.Types.ObjectId, ref: 'Request' },
  createdAt: { type: Date, default: Date.now },
});

export default models.Notification || model<INotification>('Notification', NotificationSchema); 