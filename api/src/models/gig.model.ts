import { Types, Schema, model } from "mongoose";

// Define the type of a Gig document
export interface IGig {
  _id: string;
  user: Types.ObjectId;
  title: string;
  description: string;
  reviewCount: number;
  starCount: number;
  category: string;
  coverImage: string;
  images: string[];
  packageTitle: string;
  packageDescription: string;
  packagePrice: number;
  packageFeatures: string[];
  packageDuration: number;
  packageRevisions: number;
  createdAt: string;
  updatedAt: string;
}

// Define the document schema
const gigSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    starCount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    packageTitle: {
      type: String,
      required: true,
    },
    packageDescription: {
      type: String,
      required: true,
    },
    packagePrice: {
      type: Number,
      required: true,
    },
    packageFeatures: {
      type: [String],
      required: true,
    },
    packageDuration: {
      type: Number,
      required: true,
    },
    packageRevisions: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export const Gig = model("Gig", gigSchema);
