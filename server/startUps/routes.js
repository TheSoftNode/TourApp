import express from "express";
import userRouter from "../routes/userRoutes.js";
import notificationRouter from "../routes/notificationRoute.js";
import tourRouter from "../routes/tourRoutes.js";
import reviewRouter from "../routes/reviewRoutes.js";
import bookingRouter from "../routes/bookingRoute.js";
import viewRouter from "../routes/viewRoutes.js";

export const mountedRoutes = function (app) {
  app.use(express.json());
  app.use('/', viewRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/notifications", notificationRouter);
  app.use("/api/v1/tours", tourRouter);
  app.use("/api/v1/reviews", reviewRouter);
  app.use("/api/v1/bookings", bookingRouter);
};
