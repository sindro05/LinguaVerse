import { Request, Response } from "express";

import {
  createExercise,
  getAllExercises,
  getExercisesByLesson,
  getExerciseById,
  updateExercise,
  deleteExercise,
} from "../services/exercise.service.js";

/**
 * CREATE EXERCISE
 * POST /api/exercises
 */
export const createExerciseController = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      lessonId,
      type,
      question,
      answer,
      explanation,
      points,
      order,
    } = req.body;

    // Validation
    if (
      !lessonId ||
      !type ||
      !question ||
      !answer ||
      order === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "lessonId, type, question, answer and order are required",
      });
    }

    const exercise = await createExercise({
      lessonId,
      type,
      question,
      answer,
      explanation,
      points,
      order,
    });

    return res.status(201).json({
      success: true,
      message: "Exercise created successfully",
      data: exercise,
    });
  } catch (error) {
    console.error("Create exercise error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create exercise",
    });
  }
};

/**
 * GET ALL EXERCISES
 * GET /api/exercises
 */
export const getAllExercisesController = async (
  _req: Request,
  res: Response
) => {
  try {
    const exercises = await getAllExercises();

    return res.status(200).json({
      success: true,
      count: exercises.length,
      data: exercises,
    });
  } catch (error) {
    console.error("Get all exercises error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get exercises",
    });
  }
};

/**
 * GET EXERCISES BY LESSON
 * GET /api/exercises/lesson/:lessonId
 */
export const getExercisesByLessonController = async (
  req: Request,
  res: Response
) => {
  try {
    const lessonId = req.params.lessonId as string;

    if (!lessonId) {
      return res.status(400).json({
        success: false,
        message: "lessonId is required",
      });
    }

    const exercises =
      await getExercisesByLesson(lessonId);

    return res.status(200).json({
      success: true,
      count: exercises.length,
      data: exercises,
    });
  } catch (error) {
    console.error(
      "Get exercises by lesson error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to get lesson exercises",
    });
  }
};

/**
 * GET EXERCISE BY ID
 * GET /api/exercises/:id
 */
export const getExerciseByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Exercise ID is required",
      });
    }

    const exercise = await getExerciseById(id);

    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: exercise,
    });
  } catch (error) {
    console.error("Get exercise error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to get exercise",
    });
  }
};

/**
 * UPDATE EXERCISE
 * PUT /api/exercises/:id
 */
export const updateExerciseController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Exercise ID is required",
      });
    }

    // Vérifier que l'exercice existe
    const existingExercise =
      await getExerciseById(id);

    if (!existingExercise) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found",
      });
    }

    const exercise = await updateExercise(
      id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Exercise updated successfully",
      data: exercise,
    });
  } catch (error) {
    console.error("Update exercise error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update exercise",
    });
  }
};

/**
 * DELETE EXERCISE
 * DELETE /api/exercises/:id
 */
export const deleteExerciseController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Exercise ID is required",
      });
    }

    // Vérifier que l'exercice existe
    const existingExercise =
      await getExerciseById(id);

    if (!existingExercise) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found",
      });
    }

    await deleteExercise(id);

    return res.status(200).json({
      success: true,
      message: "Exercise deleted successfully",
    });
  } catch (error) {
    console.error("Delete exercise error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete exercise",
    });
  }
};