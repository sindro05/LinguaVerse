import { Request, Response } from "express";
import {
  recordActivity,
  getUserStreak,
  getStreakLeaderboard,
  resetUserStreak,
} from "../services/userStreak.service.js";

export const recordActivityController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (typeof userId !== "string") {
      return res.status(400).json({ success: false, message: "userId is required" });
    }

    const streak = await recordActivity(userId);

    return res.status(200).json({
      success: true,
      message: "Activity recorded successfully",
      data: streak,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getUserStreakController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (typeof userId !== "string") {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    const streak = await getUserStreak(userId);

    if (!streak) {
      return res.status(404).json({ success: false, message: "Streak not found" });
    }

    return res.status(200).json({ success: true, data: streak });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getStreakLeaderboardController = async (req: Request, res: Response) => {
  try {
    const limitParam = req.query.limit;
    const limit = typeof limitParam === "string" ? parseInt(limitParam, 10) : 10;

    const leaderboard = await getStreakLeaderboard(Number.isNaN(limit) ? 10 : limit);

    return res.status(200).json({ success: true, data: leaderboard });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const resetUserStreakController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (typeof userId !== "string") {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    const streak = await resetUserStreak(userId);

    return res.status(200).json({
      success: true,
      message: "Streak reset successfully",
      data: streak,
    });
  } catch (error: any) {
    if (error?.code === "P2025") {
      return res.status(404).json({ success: false, message: "Streak not found" });
    }

    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};