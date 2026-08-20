import { Request, Response } from "express";
import {
  recordVocabularyReview,
  getVocabularyProgressByUser,
  getVocabularyProgressByVocabulary,
  getVocabularyProgressForUserAndWord,
  getDueVocabularyForUser,
  getVocabularyProgressById,
  deleteVocabularyProgress,
} from "../services/vocabularyProgress.service.js";

// CREATE / RECORD REVIEW
export const reviewVocabulary = async (req: Request, res: Response) => {
  try {
    const { userId, vocabularyId, isCorrect } = req.body;

    if (
      typeof userId !== "string" ||
      typeof vocabularyId !== "string" ||
      typeof isCorrect !== "boolean"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "userId (string), vocabularyId (string) and isCorrect (boolean) are required",
      });
    }

    const progress = await recordVocabularyReview({ userId, vocabularyId, isCorrect });

    return res.status(201).json({
      success: true,
      message: "Vocabulary review recorded successfully",
      data: progress,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "VOCABULARY_NOT_FOUND") {
      return res.status(404).json({ success: false, message: "Vocabulary not found" });
    }

    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// GET ALL FOR A USER
export const getProgressByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (typeof userId !== "string") {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    const progress = await getVocabularyProgressByUser(userId);

    return res.status(200).json({ success: true, data: progress });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// GET ALL FOR A VOCABULARY WORD
export const getProgressByVocabulary = async (req: Request, res: Response) => {
  try {
    const { vocabularyId } = req.params;

    if (typeof vocabularyId !== "string") {
      return res.status(400).json({ success: false, message: "Invalid vocabularyId" });
    }

    const progress = await getVocabularyProgressByVocabulary(vocabularyId);

    return res.status(200).json({ success: true, data: progress });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// GET ONE (user + vocabulary)
export const getProgressForUserAndWord = async (req: Request, res: Response) => {
  try {
    const { userId, vocabularyId } = req.params;

    if (typeof userId !== "string" || typeof vocabularyId !== "string") {
      return res.status(400).json({ success: false, message: "Invalid userId or vocabularyId" });
    }

    const progress = await getVocabularyProgressForUserAndWord(userId, vocabularyId);

    if (!progress) {
      return res.status(404).json({ success: false, message: "Vocabulary progress not found" });
    }

    return res.status(200).json({ success: true, data: progress });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// GET WORDS DUE FOR REVIEW
export const getDueForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    if (typeof userId !== "string") {
      return res.status(400).json({ success: false, message: "Invalid userId" });
    }

    const due = await getDueVocabularyForUser(userId);

    return res.status(200).json({ success: true, data: due });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// GET BY ID
export const getProgressById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({ success: false, message: "Invalid id" });
    }

    const progress = await getVocabularyProgressById(id);

    if (!progress) {
      return res.status(404).json({ success: false, message: "Vocabulary progress not found" });
    }

    return res.status(200).json({ success: true, data: progress });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// DELETE
export const removeProgress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({ success: false, message: "Invalid id" });
    }

    await deleteVocabularyProgress(id);

    return res.status(200).json({ success: true, message: "Vocabulary progress deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};