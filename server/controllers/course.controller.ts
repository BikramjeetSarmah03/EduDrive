import { Request, Response, NextFunction } from "express";
import courseModel from "../models/course.model";
import ErrorHandler from "../utils/ErrorHandler";
import { catchAsyncError } from "../middlewares/catchAsyncErrors";
import { uploadImage, deleteImage } from "../utils/cloudinary";
import { createCourse } from "../services/course.service";

// upload course
export const uploadCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;

      if (thumbnail) {
        const myCloud = await uploadImage(thumbnail, {
          folder: "EduDrive/courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const editCourse = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const course = await courseModel.findById(courseId);

      if (!course) return next(new ErrorHandler("Course not found", 404));

      const data = req.body;
      const thumbnail = data.thumbnail;

      if (thumbnail) {
        await deleteImage(thumbnail.public_id);

        const myCloud = await uploadImage(thumbnail, {
          folder: "EduDrive/courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      const updatedCourse = await courseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        course: updatedCourse,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
