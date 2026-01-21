import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import type { RegisterReq, LoginReq } from "../types/index.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import upload from "../utils/cloudinary.js";
import c from "../utils/catch-async.js";
import e from "../utils/error.js";
import { config, isProduction } from "../config/environment.js";

// SIGN-UP - CREATE A NEW ACCOUNT
const register = c(
  async (
    req: RegisterReq,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    // Generate a salt and hash the password
    const hashedPass: string = bcrypt.hashSync(req.body.password, 12);

    //Save image in cloudinary
    const image = await upload(
      next,
      req.file?.path as string,
      "avatars",
      200,
      200,
      "fill",
      "auto"
    );

    // Save the new user to the database
    const newUser = await User.create({
      ...req.body,
      password: hashedPass,
      profilePicture: image.secure_url,
    });

    res.json({ message: "You have successfully registered", user: newUser });
  }
);


// LOGIN
const login = c(
  async (req: LoginReq, res: Response, next: NextFunction): Promise<void> => {
    // Find the user by username
    const user = await User.findOne({
      username: req.body.username,
    });

    // If the user does not exist, return an error
    if (!user) {
      return next(e(404, "No user found"));
    }

    // Compare the password from the request with the hashed password in the database
    const isPassCorrect: boolean = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    // If the passwords do not match, return an error
    if (!isPassCorrect) {
      return next(e(401, "Invalid credentials"));
    }

    // If the password is correct, create a JWT
    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRES,
      }
    );

    // Send the token back to the client
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: isProduction ? true : false,
        sameSite: "lax",
        expires: new Date(Date.now() + 14 * 24 * 3600 * 1000),
      })
      .json({ message: "You successfully logged in", user });
  }
);


// LOGOUT
const logout = (req: Request, res: Response): void => {
  res.clearCookie("token").status(200).json({ message: "You logged out" });
};


// PROFILE ------ Display Profile Information
const getProfile = c(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // We query the user's information using the user ID
    // coming from the request object provided by the protect middleware
    const user = await User.findById(req.userId);

    // If the user is not found
    if (!user) {
      return next(e(404, "User not found"));
    }

    // Send response to the client
    res.status(200).json({
      message: "Profile data retrieved successfully",
      user,
    });
  }
);

export { register, login, logout, getProfile };
