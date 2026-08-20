import { Request, Response } from "express";
import {
  unlockAchievement,
  getUserAchievements,
  getAchievementUnlockers,
  hasUserUnlocked,
  revokeAchievement,
} from "../services/userAchievement.service.js";

export const unlockAchievementController = async (req: Request, res: Response) => {
  try {
    const { userId, achievementId } = req.body;

    if (typeof userId !== "string" || typeof achievementId !== "string") {
      return res.status(400).json({
        success: false,
        message: "userId and achievementId are required strings",
      });
    }

    const userAchievement = await unlockAchievement(userId, achievementId);

    return res.status(201).json({
      success: true,
      message: "Achievement unlocked successfully",
      data: userAchievement,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "ACHIEVEMENT_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Achievement not found" });
    }

    if (error instanceof Error && error.message === "ALREADY_UNLOCKED") {
      return res.status(409).json({ success: false, message: "Achievement already unlocked" });
    }

    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getUserAchievementsController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (typeof userId !== "string") {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    const achievements = await getUserAchievements(userId);

    return res.status(200).json({ success: true, data: achievements });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAchievementUnlockersController = async (req: Request, res: Response) => {
  try {
    const { achievementId } = req.params;

    if (typeof achievementId !== "string") {
      return res.status(400).json({ success: false, message: "Invalid achievementId" });
    }

    const unlockers = await getAchievementUnlockers(achievementId);

    return res.status(200).json({ success: true, data: unlockers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const checkUserAchievementController = async (req: Request, res: Response) => {
  try {
    const { userId, achievementId } = req.params;

    if (typeof userId !== "string" || typeof achievementId !== "string") {
      return res.status(400).json({ success: false, message: "Invalid userId or achievementId" });
    }

    const result = await hasUserUnlocked(userId, achievementId);

    return res.status(200).json({ success: true, unlocked: Boolean(result), data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const revokeAchievementController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({ success: false, message: "Invalid id" });
    }

    await revokeAchievement(id);

    return res.status(200).json({ success: true, message: "Achievement revoked successfully" });
  } catch (error: any) {
    if (error?.code === "P2025") {
      return res.status(404).json({ success: false, message: "User achievement not found" });
    }

    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};