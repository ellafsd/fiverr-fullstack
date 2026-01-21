type ExtendedError = Error & { status: number };

const error = (status: number, message: string) => {
  // Create an Error object
  const err = new Error(message) as ExtendedError;

  // Attach a status code to the error object
  err.status = status;

  // Return the created error object
  return err;
};

export default error;
