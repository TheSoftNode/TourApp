import express from "express";
import userRouter from "../routes/userRoutes.js";
import notificationRouter from "../routes/notificationRoute.js";

export const mountedRoutes = function (app) {
  app.use(express.json());
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/notifications", notificationRouter);
};
