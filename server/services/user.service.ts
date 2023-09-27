import { Response } from "express";
import { redis } from "../utils/redis";

// get user by id
export const getUserById = async (id: string, res: Response) => {
  const userData = await redis.get(id);

  if (userData) {
    const user = JSON.parse(userData);

    res.status(200).json({
      success: true,
      user,
    });
  }
};
