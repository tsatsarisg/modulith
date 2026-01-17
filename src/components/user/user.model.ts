import mongoose, { Schema, Document } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
}

export interface IUserDocument extends IUser, Document {
  _id: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUserDocument>('User', userSchema);
