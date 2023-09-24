import express, { NextFunction, Request, Response } from "express";
import userRoutes from "./user.route";

const router = express.Router();

router.use("/", userRoutes);

router.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Router ${req.originalUrl} not found`) as any;
  err.statusCode = 404;

  next(err);
});

export default router;
