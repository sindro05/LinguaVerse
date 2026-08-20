import { Request, Response } from "express";
import {
  createAchievement,
  getAllAchievements,
  getAchievementById,
  updateAchievement,
  deleteAchievement,
} from "../services/achievement.service.js";

export const createAchievementController = async (req: Request, res: Response) => {
  try {
    const { name, description, icon, xpReward } = req.body;

    if (typeof name !== "string" || typeof description !== "string") {
      return res.status(400).json({
        success: false,
        message: "name and description are required strings",
      });
    }

    const achievement = await createAchievement({ name, description, icon, xpReward });

    return res.status(201).json({
      success: true,
      message: "Achievement created successfully",
      data: achievement,
    });
  } catch (error: any) {
    if (error?.code === "P2002") {
      return res.status(409).json({ success: false, message: "Achievement name already exists" });
    }

    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllAchievementsController = async (_req: Request, res: Response) => {
  try {
    const achievements = await getAllAchievements();

    return res.status(200).json({ success: true, data: achievements });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAchievementByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({ success: false, message: "Invalid id" });
    }

    const achievement = await getAchievementById(id);

    if (!achievement) {
      return res.status(404).json({ success: false, message: "Achievement not found" });
    }

    return res.status(200).json({ success: true, data: achievement });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateAchievementController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({ success: false, message: "Invalid id" });
    }

    const { name, description, icon, xpReward } = req.body;

    const achievement = await updateAchievement(id, { name, description, icon, xpReward });

    return res.status(200).json({
      success: true,
      message: "Achievement updated successfully",
      data: achievement,
    });
  } catch (error: any) {
    if (error?.code === "P2025") {
      return res.status(404).json({ success: false, message: "Achievement not found" });
    }

    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteAchievementController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({ success: false, message: "Invalid id" });
    }

    await deleteAchievement(id);

    return res.status(200).json({ success: true, message: "Achievement deleted successfully" });
  } catch (error: any) {
    if (error?.code === "P2025") {
      return res.status(404).json({ success: false, message: "Achievement not found" });
    }

    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};