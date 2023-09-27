import { v2 as cloudinary } from "cloudinary";

export default async function cloudinaryConfig() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_SECRET_KEY as string,
  });
}

export const uploadImage = async (file: any, options?: {}) => {
  return await cloudinary.uploader.upload(file, options);
};

export const deleteImage = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId);
};
