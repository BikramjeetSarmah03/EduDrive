import { Response } from "express";
import courseModel from "../models/course.model";
import { catchAsyncError } from "../middlewares/catchAsyncErrors";

// create course
export const createCourse = catchAsyncError(
  async (data: any, res: Response) => {
    const course = await courseModel.create(data);

    res.status(201).json({
      success: true,
      course,
    });
  }
);
