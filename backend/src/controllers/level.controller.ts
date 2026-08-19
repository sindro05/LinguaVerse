import { Request, Response } from "express";
import * as levelService from "../services/level.service.js";

export const getLevels = async (
  req: Request,
  res: Response,
) => {
  try {
    const languageId = req.query.languageId as string | undefined;

    const levels = await levelService.getAllLevels(languageId);

    return res.status(200).json({
      success: true,
      data: levels,
    });
  } catch (error) {
    console.error("Get levels error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve levels",
    });
  }
};

export const getLevel = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req.params.id as string;

    const level = await levelService.getLevelById(id);

    if (!level) {
      return res.status(404).json({
        success: false,
        message: "Level not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: level,
    });
  } catch (error) {
    console.error("Get level error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve level",
    });
  }
};

export const createLevel = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      languageId,
      name,
      description,
      difficulty,
      order,
      requiredXp,
    } = req.body;

    if (!languageId || !name || order === undefined) {
      return res.status(400).json({
        success: false,
        message: "languageId, name and order are required",
      });
    }

    const level = await levelService.createLevel({
      languageId,
      name,
      description,
      difficulty,
      order,
      requiredXp,
    });

    return res.status(201).json({
      success: true,
      message: "Level created successfully",
      data: level,
    });
  } catch (error: any) {
    console.error("Create level error:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "A level with this order already exists for this language",
      });
    }

    if (error.code === "P2003") {
      return res.status(400).json({
        success: false,
        message: "Invalid languageId",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create level",
    });
  }
};

export const updateLevel = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req.params.id as string;

    const {
      name,
      description,
      difficulty,
      order,
      requiredXp,
    } = req.body;

    const level = await levelService.updateLevel(id, {
      name,
      description,
      difficulty,
      order,
      requiredXp,
    });

    return res.status(200).json({
      success: true,
      message: "Level updated successfully",
      data: level,
    });
  } catch (error: any) {
    console.error("Update level error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Level not found",
      });
    }

    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "A level with this order already exists for this language",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update level",
    });
  }
};

export const deleteLevel = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req.params.id as string;

    await levelService.deleteLevel(id);

    return res.status(200).json({
      success: true,
      message: "Level deleted successfully",
    });
  } catch (error: any) {
    console.error("Delete level error:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Level not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to delete level",
    });
  }
};