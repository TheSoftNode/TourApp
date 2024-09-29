import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { mountedRoutes } from "./routes.js";
import YAML from "yamljs";
import { readFileSync } from "fs";
import globalErrorHandler from "../errorHandlers/errorHandler.js";

const app = express();
const __dirname = path.resolve();

// Load the swagger.yaml file
// const swaggerDocument = YAML.load(path.join(__dirname, './swagger/swagger.yaml'));
// Read the swagger.json file
const swaggerDocument2 = JSON.parse(
  readFileSync(path.join(__dirname, './swagger/users/swagger.json'), 'utf8')
);

// Swagger route
app.use('/STour/users', swaggerUi.serve, swaggerUi.setup(swaggerDocument2));


// SET Security HTTP headers
app.use(helmet());

// Development logging
app.use(morgan("dev"));


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
