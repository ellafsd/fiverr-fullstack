import type { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: { status?: number; message?: string ; stack?: string},
  req: Request,
  res: Response,
  next: NextFunction
): void => {

   // Determine the error details to be sent
  const errStatus: number = err.status || 500;
  const errMessage: string = err.message || "Unknown Error";


  // Log detailed error information to the console
  console.error("Error Details",{
    message: errMessage,
    status: errStatus,
    stack: err?.stack || "No stack trace available"
}),

  // Send the error response to the client
  res.status(errStatus).json({
    status: errStatus === 500 ? "error" : "fail",
    statusCode: errStatus,
    message: errMessage,
  });
  return;
};

export default errorHandler;
