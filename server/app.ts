require("dotenv").config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import ErrorMiddleware from "./middlewares/error";
import routes from "./routes/user.route";

const app = express();

app.use(
  cors({
    origin: process.env.ORIGINS,
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/v1", routes);

app.use(ErrorMiddleware);

export default app;
