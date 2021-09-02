// import winston from "winston";

// class AppError {
//   public readonly message: string;
//   public readonly statusCode: number;

//   constructor(message: string, statusCode = 400) {
//     this.message = message;
//     this.statusCode = statusCode;

//     const logSettings = {
//       transports: [
//         new winston.transports.File({
//           filename: "logs/errors.log",
//         }),
//       ],
//       format: winston.format.combine(
//         winston.format.timestamp({
//           format: "DD MMM YYYY HH:mm:ss",
//         }),
//         winston.format.printf(info => `${[info.timestamp]}: ${info.message}`),
//       ),
//     };

//     const logger = winston.createLogger(logSettings);

//     // Log a message
//     logger.log({
//       // Message to be logged
//       message: this.message,

//       // Level of the message logging
//       level: "error",
//     });
//   }
// }

// export default AppError;

export function isOperationalError(error: Error): boolean {
  if (error instanceof AppError) {
    return error.OperationalError;
  }
  return false;
}

class AppError extends Error {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly OperationalError: boolean;

  constructor(message: string, statusCode = 400, OperationalError = true) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.statusCode = statusCode;
    this.OperationalError = OperationalError;
    Error.captureStackTrace(this);
    // console.log(message, statusCode);
  }

  public isOperationalError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.OperationalError;
    }
    return false;
  }
}

export default AppError;
