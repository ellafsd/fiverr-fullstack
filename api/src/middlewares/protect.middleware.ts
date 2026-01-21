import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import e from "../utils/error.js";

// Middleware that authenticates the user based on the JWT token received via cookies or Authorization header

const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // 1) Access token from Authorization or cookies header
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  // 2) If no token exists, return an authorization error
  if (!token) {
    return next(e(403, "You are not authorized"));
  }

  // 3) If token exists, verify its validity
  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, payload: any) => {
      // 4) If token is invalid or expired, return an error
      if (err) {
        return next(e(401, "Session expired. Please log in again"));
      }

      // 5) If token is valid, attach user information to the request obj. This allows subsequent functions to access the user's ID and role (isSeller) to access user id and role
      req.userId = payload.id;
      req.isSeller = payload.isSeller;
    }
  );

  // 6) Continue to the next middleware or controller
  next();
};

export default protect;
