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

class AppError extends Error {
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
    // console.log(message, statusCode);
  }
}

export default AppError;
