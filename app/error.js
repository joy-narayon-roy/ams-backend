const jwt = require("jsonwebtoken");
const { ServerError } = require("../models");

const notFoundHandler = (_req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
};

/**
 *
 * @param {*} error
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
const errorHandler = async (error, req, res, next) => {
  if (error.status) {
    // Handles errors with a custom status (e.g., CORS errors, 404)
    res.status(error.status).json({
      message: error.message,
    });
  } else if (error instanceof jwt.TokenExpiredError) {
    // Handles expired JWT tokens
    res.status(401).json({
      message: "Token expired",
    });
  } else if (error instanceof jwt.JsonWebTokenError) {
    // Handles invalid JWT tokens
    res.status(401).json({
      message: "Invalid token",
    });
  } else if (error.message === "Not allowed by CORS") {
    // Explicitly handle CORS errors
    res.status(403).json({
      message: "CORS error: Access denied from origin",
    });
  } else {
    const errorObj = {
      status: 500,
      ip: req.ip,
      path: req.path,
      method: req.method,
      headers: req.headers,
      body: req.body,
      error: error.toJSON(),
    };
    const newError = new ServerError(errorObj);
    await newError.save();
    console.log(errorObj);
    console.error("Error occurs :", newError.id);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  notFoundHandler,
  errorHandler,
};

// const jwt = require("jsonwebtoken");

// const notFoundHandler = (req, res, next) => {
//   const err = new Error("Not Found");
//   err.status = 404;
//   next(err);
// };

// const errorHandler = (error, req, res, next) => {
//   if (error.status) {
//     res.status(error.status).json({
//       message: error.message,
//     });
//   } else if (error instanceof jwt.TokenExpiredError) {
//     res.status(401).json({
//       message: "Token expired",
//     });
//   } else if (error instanceof jwt.JsonWebTokenError) {
//     res.status(401).json({
//       message: "Invalid token",
//     });
//   } else {
//     console.log(error);
//     res.status(500).json({
//       message: "Something went wrong",
//     });
//   }
// };

// module.exports = {
//   notFoundHandler,
//   errorHandler,
// };
