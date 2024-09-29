import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { mountedRoutes } from "./routes.js";
import { readFileSync } from "fs";
import globalErrorHandler from "../errorHandlers/errorHandler.js";

const app = express();
const __dirname = path.resolve();


// Read Swagger JSON files
const swaggerDocument = JSON.parse(
  readFileSync(path.join(__dirname, './swagger/users/swagger.json'), 'utf8')
);

// Swagger route for users
app.use('/STour', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// SET Security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development')
{
  app.use(morgan("dev"));
}


// The body parser, reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));

// The cookie parser; for handling sending cookie to the frontend
app.use(cookieParser());

// The cross origin resource sharing
const corOptions = cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  credentials: true,
});
app.use(corOptions);

mountedRoutes(app);

app.all("*", (req, res, next) =>
{
  const err = new Error(`Can't find ${req.originalUrl} in this server!`);
  err.statusCode = 404;
  next(err);
});

app.use(globalErrorHandler);

export default app;
