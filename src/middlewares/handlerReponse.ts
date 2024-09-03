import { Handler } from "express";

type ErrorResponse = Express.ErrorInfo;

const handlerResponse: Handler = (req, res, next) => {
  res.success = <T>(HttpStatusCode: number, data: T) => {
    res.status(HttpStatusCode).json({
      success: data,
      date: new Date(),
    });
  };

  res.error = (HttpStatusCode: number, error: ErrorResponse) => {
    res.status(HttpStatusCode).json({
      error: error,
      date: new Date(),
      url: req.originalUrl,
    });
  };

  next();
};

export default handlerResponse;
