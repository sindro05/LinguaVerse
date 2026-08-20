import { Request, Response } from "express";

import {
  getAllVocabulary,
  getVocabularyById,
  getVocabularyByLanguage,
  getVocabularyByLesson,
  createVocabulary,
  updateVocabulary,
  deleteVocabulary,
} from "../services/vocabulary.service.js";

// =====================================================
// GET ALL
// =====================================================

export const getVocabulary = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const vocabulary = await getAllVocabulary();

    res.status(200).json({
      success: true,
      data: vocabulary,
    });
  } catch (error) {
    console.error("Get vocabulary error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch vocabulary",
    });
  }
};

// =====================================================
// GET BY ID
// =====================================================

export const getVocabularyItem = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid vocabulary ID",
      });
      return;
    }

    const vocabulary = await getVocabularyById(id);

    if (!vocabulary) {
      res.status(404).json({
        success: false,
        message: "Vocabulary not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: vocabulary,
    });
  } catch (error) {
    console.error(
      "Get vocabulary item error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch vocabulary",
    });
  }
};

// =====================================================
// GET BY LANGUAGE
// =====================================================

export const getVocabularyForLanguage = async (
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

    const vocabulary =
      await getVocabularyByLanguage(languageId);

    res.status(200).json({
      success: true,
      data: vocabulary,
    });
  } catch (error) {
    console.error(
      "Get vocabulary by language error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch vocabulary",
    });
  }
};

// =====================================================
// GET BY LESSON
// =====================================================

export const getVocabularyForLesson = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { lessonId } = req.params;

    if (typeof lessonId !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid lesson ID",
      });
      return;
    }

    const vocabulary =
      await getVocabularyByLesson(lessonId);

    res.status(200).json({
      success: true,
      data: vocabulary,
    });
  } catch (error) {
    console.error(
      "Get vocabulary by lesson error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch vocabulary",
    });
  }
};

// =====================================================
// CREATE
// =====================================================

export const createVocabularyController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      languageId,
      lessonId,
      word,
      translation,
      pronunciation,
      example,
      audioUrl,
      difficulty,
    } = req.body;

    if (!languageId || !word || !translation) {
      res.status(400).json({
        success: false,
        message:
          "languageId, word and translation are required",
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

    if (lessonId !== undefined && lessonId !== null) {
      if (typeof lessonId !== "string") {
        res.status(400).json({
          success: false,
          message: "lessonId must be a string",
        });
        return;
      }
    }

    if (typeof word !== "string") {
      res.status(400).json({
        success: false,
        message: "word must be a string",
      });
      return;
    }

    if (typeof translation !== "string") {
      res.status(400).json({
        success: false,
        message: "translation must be a string",
      });
      return;
    }

    const vocabulary = await createVocabulary({
      languageId,
      lessonId,
      word,
      translation,
      pronunciation,
      example,
      audioUrl,
      difficulty,
    });

    res.status(201).json({
      success: true,
      message: "Vocabulary created successfully",
      data: vocabulary,
    });
  } catch (error) {
    console.error(
      "Create vocabulary error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Failed to create vocabulary";

    res.status(400).json({
      success: false,
      message,
    });
  }
};

// =====================================================
// UPDATE
// =====================================================

export const updateVocabularyController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid vocabulary ID",
      });
      return;
    }

    const vocabulary = await updateVocabulary(
      id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Vocabulary updated successfully",
      data: vocabulary,
    });
  } catch (error) {
    console.error(
      "Update vocabulary error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Failed to update vocabulary";

    const status =
      message === "Vocabulary not found"
        ? 404
        : 400;

    res.status(status).json({
      success: false,
      message,
    });
  }
};

// =====================================================
// DELETE
// =====================================================

export const deleteVocabularyController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(400).json({
        success: false,
        message: "Invalid vocabulary ID",
      });
      return;
    }

    await deleteVocabulary(id);

    res.status(200).json({
      success: true,
      message: "Vocabulary deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete vocabulary error:",
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : "Failed to delete vocabulary";

    const status =
      message === "Vocabulary not found"
        ? 404
        : 400;

    res.status(status).json({
      success: false,
      message,
    });
  }
};