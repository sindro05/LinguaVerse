import { Request, Response } from "express";
import { getDashboard } from "../services/dashboard.service.js";

export const getDashboardController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (typeof userId !== "string") {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    const dashboard = await getDashboard(userId);

    return res.status(200).json({ success: true, data: dashboard });
  } catch (error) {
    if (error instanceof Error && error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};