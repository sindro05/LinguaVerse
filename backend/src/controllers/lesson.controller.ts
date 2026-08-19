import { Request, Response } from "express";

import {
  getAllLessons,
  getLessonById,
  getLessonsByLanguage,
  getLessonsByLevel,
  createLesson,
  updateLesson,
  deleteLesson,
} from "../services/lesson.service.js";

export const getLessons = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const lessons = await getAllLessons();

    res.status(200).json({
      success: true,
      data: lessons,
    });
  } catch (error) {
    console.error("Get lessons error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch lessons",
    });
  }
};

export const getLesson = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid lesson ID",
      });
      return;
    }

    const lesson = await getLessonById(id);

    if (!lesson) {
      res.status(404).json({
        success: false,
        message: "Lesson not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: lesson,
    });
  } catch (error) {
    console.error("Get lesson error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch lesson",
    });
  }
};

export const getLessonsForLanguage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { languageId } = req.params;

    if (typeof languageId !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid language ID",
      });
      return;
    }

    const lessons = await getLessonsByLanguage(languageId);

    res.status(200).json({
      success: true,
      data: lessons,
    });
  } catch (error) {
    console.error("Get lessons by language error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch lessons",
    });
  }
};

export const getLessonsForLevel = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { levelId } = req.params;

    if (typeof levelId !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid level ID",
      });
      return;
    }

    const lessons = await getLessonsByLevel(levelId);

    res.status(200).json({
      success: true,
      data: lessons,
    });
  } catch (error) {
    console.error("Get lessons by level error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch lessons",
    });
  }
};

export const createLessonController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      languageId,
      levelId,
      title,
      description,
      type,
      difficulty,
      order,
      xpReward,
      duration,
    } = req.body;

    if (
      !languageId ||
      !title ||
      !type ||
      !difficulty ||
      order === undefined
    ) {
      res.status(400).json({
        success: false,
        message:
          "languageId, title, type, difficulty and order are required",
      });
      return;
    }

    if (typeof languageId !== "string") {
      res.status(400).json({
        success: false,
        message: "languageId must be a string",
      });
      return;
    }

    if (levelId !== undefined && levelId !== null) {
      if (typeof levelId !== "string") {
        res.status(400).json({
          success: false,
          message: "levelId must be a string",
        });
        return;
      }
    }

    if (typeof title !== "string") {
      res.status(400).json({
        success: false,
        message: "title must be a string",
      });
      return;
    }

    if (typeof order !== "number") {
      res.status(400).json({
        success: false,
        message: "order must be a number",
      });
      return;
    }

    const lesson = await createLesson({
      languageId,
      levelId,
      title,
      description,
      type,
      difficulty,
      order,
      xpReward,
      duration,
    });

    res.status(201).json({
      success: true,
      message: "Lesson created successfully",
      data: lesson,
    });
  } catch (error) {
    console.error("Create lesson error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to create lesson";

    res.status(400).json({
      success: false,
      message,
    });
  }
};

export const updateLessonController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid lesson ID",
      });
      return;
    }

    const lesson = await updateLesson(id, req.body);

    res.status(200).json({
      success: true,
      message: "Lesson updated successfully",
      data: lesson,
    });
  } catch (error) {
    console.error("Update lesson error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to update lesson";

    const status =
      message === "Lesson not found" ? 404 : 400;

    res.status(status).json({
      success: false,
      message,
    });
  }
};

export const deleteLessonController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid lesson ID",
      });
      return;
    }

    await deleteLesson(id);

    res.status(200).json({
      success: true,
      message: "Lesson deleted successfully",
    });
  } catch (error) {
    console.error("Delete lesson error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to delete lesson";

    const status =
      message === "Lesson not found" ? 404 : 400;

    res.status(status).json({
      success: false,
      message,
    });
  }
};