import express from "express";
import userRouter from "../routes/userRoute.js";

export const mountedRoutes = function (app) {
  app.use(express.json());
  app.use("/api/v1/users", userRouter);
};
