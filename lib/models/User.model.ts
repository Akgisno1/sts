import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  email?: string;
  phoneNumber?: string;
  profilePictureUrl?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  onboardingCompleted?: boolean;
  notifications?: number;
  createdAt: Date;
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  profilePictureUrl: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: String },

  onboardingCompleted: { type: Boolean, default: false },
  notifications: { type: Number, default: 0 },

  createdAt: { type: Date, default: Date.now },
});

const User = models?.User || model<IUser>("User", UserSchema);
export default User;
