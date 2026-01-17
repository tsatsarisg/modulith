import mongoose, { Schema, Document } from 'mongoose';

export type FranchiseCategory = 'Carwash' | 'Bakery';

export interface IFranchise {
  name: string;
  category: FranchiseCategory;
}

export interface IFranchiseDocument extends IFranchise, Document {
  _id: mongoose.Types.ObjectId;
}

const franchiseSchema = new Schema<IFranchiseDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Carwash', 'Bakery'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FranchiseModel = mongoose.model<IFranchiseDocument>('Franchise', franchiseSchema);
