import { Request, Response } from "express";

import {
  createLessonProgress,
  getAllLessonProgress,
  getLessonProgressById,
  getLessonProgressByUser,
  getLessonProgressByLesson,
  getUserLessonProgress,
  updateLessonProgress,
  deleteLessonProgress,
} from "../services/lessonProgress.service.js";

// =====================================================
// CREATE
// =====================================================

export const createLessonProgressController = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      userId,
      lessonId,
      status,
      progress,
      score,
      completedAt,
    } = req.body;

    if (!userId || !lessonId) {
      return res.status(400).json({
        success: false,
        message: "userId and lessonId are required",
      });
    }

    if (
      progress !== undefined &&
      (progress < 0 || progress > 100)
    ) {
      return res.status(400).json({
        success: false,
        message: "progress must be between 0 and 100",
      });
    }

    const result = await createLessonProgress({
      userId,
      lessonId,
      status,
      progress,
      score,
      completedAt: completedAt
        ? new Date(completedAt)
        : null,
    });

    return res.status(201).json({
      success: true,
      message: "Lesson progress created successfully",
      data: result,
    });
  } catch (error) {
    console.error(
      "Create lesson progress error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create lesson progress",
    });
  }
};

// =====================================================
// GET ALL
// =====================================================

export const getAllLessonProgressController = async (
  _req: Request,
  res: Response
) => {
  try {
    const results = await getAllLessonProgress();

    return res.status(200).json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error(
      "Get all lesson progress error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to get lesson progress",
    });
  }
};

// =====================================================
// GET BY ID
// =====================================================

export const getLessonProgressByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Progress ID is required",
      });
    }

    const result = await getLessonProgressById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Lesson progress not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(
      "Get lesson progress error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to get lesson progress",
    });
  }
};

// =====================================================
// GET BY USER
// =====================================================

export const getLessonProgressByUserController =
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId as string;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required",
        });
      }

      const results =
        await getLessonProgressByUser(userId);

      return res.status(200).json({
        success: true,
        count: results.length,
        data: results,
      });
    } catch (error) {
      console.error(
        "Get user lesson progress error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to get user's lesson progress",
      });
    }
  };

// =====================================================
// GET BY LESSON
// =====================================================

export const getLessonProgressByLessonController =
  async (req: Request, res: Response) => {
    try {
      const lessonId =
        req.params.lessonId as string;

      if (!lessonId) {
        return res.status(400).json({
          success: false,
          message: "Lesson ID is required",
        });
      }

      const results =
        await getLessonProgressByLesson(lessonId);

      return res.status(200).json({
        success: true,
        count: results.length,
        data: results,
      });
    } catch (error) {
      console.error(
        "Get lesson progress by lesson error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to get lesson progress",
      });
    }
  };

// =====================================================
// GET USER + LESSON
// =====================================================

export const getUserLessonProgressController =
  async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId as string;
      const lessonId =
        req.params.lessonId as string;

      if (!userId || !lessonId) {
        return res.status(400).json({
          success: false,
          message:
            "userId and lessonId are required",
        });
      }

      const result =
        await getUserLessonProgress(
          userId,
          lessonId
        );

      if (!result) {
        return res.status(404).json({
          success: false,
          message:
            "Lesson progress not found for this user",
        });
      }

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error(
        "Get user lesson progress error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to get user lesson progress",
      });
    }
  };

// =====================================================
// UPDATE
// =====================================================

export const updateLessonProgressController =
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Progress ID is required",
        });
      }

      const existing =
        await getLessonProgressById(id);

      if (!existing) {
        return res.status(404).json({
          success: false,
          message: "Lesson progress not found",
        });
      }

      const {
        status,
        progress,
        score,
        completedAt,
      } = req.body;

      if (
        progress !== undefined &&
        (progress < 0 || progress > 100)
      ) {
        return res.status(400).json({
          success: false,
          message: "progress must be between 0 and 100",
        });
      }

      const result =
        await updateLessonProgress(id, {
          status,
          progress,
          score,
          completedAt:
            completedAt !== undefined
              ? completedAt
                ? new Date(completedAt)
                : null
              : undefined,
        });

      return res.status(200).json({
        success: true,
        message:
          "Lesson progress updated successfully",
        data: result,
      });
    } catch (error) {
      console.error(
        "Update lesson progress error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update lesson progress",
      });
    }
  };

// =====================================================
// DELETE
// =====================================================

export const deleteLessonProgressController =
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Progress ID is required",
        });
      }

      const existing =
        await getLessonProgressById(id);

      if (!existing) {
        return res.status(404).json({
          success: false,
          message: "Lesson progress not found",
        });
      }

      await deleteLessonProgress(id);

      return res.status(200).json({
        success: true,
        message:
          "Lesson progress deleted successfully",
      });
    } catch (error) {
      console.error(
        "Delete lesson progress error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete lesson progress",
      });
    }
  };