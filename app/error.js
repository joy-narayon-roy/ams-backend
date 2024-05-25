const jwt = require("jsonwebtoken");

const notFoundHandler = (req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
};

const errorHandler = (error, req, res, next) => {
  if (error.status) {
    res.status(error.status).json({
      message: error.message,
    });
  } else if (error instanceof jwt.TokenExpiredError) {
    res.status(401).json({
      message: "Token expired",
    });
  } else if (error instanceof jwt.JsonWebTokenError) {
    res.status(401).json({
      message: "Invalid token",
    });
  } else {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
