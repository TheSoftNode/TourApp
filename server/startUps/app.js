import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
// import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { mountedRoutes } from "./routes.js";
import globalErrorHandler from "../errorHandlers/errorHandler.js";

const app = express();

// Always put at the top of all middlewares
// SET Security HTTP headers
app.use(helmet());

// Development logging
app.use(morgan("dev"));

// Limit request from the same IP address
// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP. Please try again in an hour",
// });
// app.use("/api", limiter);

// The body parser, reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));

// The cookie parser; for handling sending cookie to the frontend
app.use(cookieParser());

// The cross origin resource sharing
const corOptions = cors({
  //   origin: process.env.ORIGIN,
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
});
app.use(corOptions);

mountedRoutes(app);

app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} in this server!`);
  err.statusCode = 404;
  next(err);
  // next(new AppError(`Can't find ${req.originalUrl} in this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
