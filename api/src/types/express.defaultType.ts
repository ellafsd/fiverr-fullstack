import * as express from "express";

// Since we add new properties (userId, isSeller) to the Request interface inside Express,
// we extend the type of the Request interface with the definition below.
declare global {
  namespace Express {
    interface Request {
      headers: { authorization?: string } & Headers;
      cookies: { token?: string };
      userId?: string;
      isSeller?: boolean;
    }
  }
}