import { Schema, model } from "mongoose";
import { defaultProfile } from "../utils/constants.js";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  country: string;
  isSeller: boolean;
  phone?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: [true, "This username is already in use"],
      required: [true, "Please provide a username"],
    },
    email: {
      type: String,
      unique: [true, "This email address is already in use"],
      required: [true, "Please provide an email address"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    country: {
      type: String,
      required: [true, "Please provide a country"],
    },
    profilePicture: {
      type: String,
      default: defaultProfile,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true, // stores creation and update timestamps
    toJSON: {
      // remove fields we don't want to send to the client in the response
      transform: function (doc, ret:any) {
        ret.id = ret._id;
        delete ret.password;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// create the MongoDB model
const User = model<IUser>("User", userSchema);

// export the model
export default User;
