import type { NextFunction, Request, Response } from "express";

type FunctionType = (req: Request, res: Response, next: NextFunction) => Promise<any>;

// Executes the function passed as a parameter. If the funct
// throws an error, it forwards the error to the error-handling middleware
const catchAsync = (fn: FunctionType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
