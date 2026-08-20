import { Request, Response } from "express";

import {
  createExerciseAttempt,
  getExerciseAttemptsByUser,
  getExerciseAttemptsByExercise,
  getExerciseAttemptById,
} from "../services/exercise-attempt.service.js";

export const createAttempt = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, exerciseId, answer } = req.body;

    if (
      typeof userId !== "string" ||
      typeof exerciseId !== "string" ||
      typeof answer !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "userId, exerciseId and answer must be valid strings",
      });
    }

    const attempt = await createExerciseAttempt(
      userId,
      exerciseId,
      answer
    );

    return res.status(201).json({
      success: true,
      message: "Exercise attempt created successfully",
      data: attempt,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "EXERCISE_NOT_FOUND"
    ) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found",
      });
    }

    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAttemptsByUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;

    if (typeof userId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid userId",
      });
    }

    const attempts =
      await getExerciseAttemptsByUser(userId);

    return res.status(200).json({
      success: true,
      data: attempts,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAttemptsByExercise = async (
  req: Request,
  res: Response
) => {
  try {
    const { exerciseId } = req.params;

    if (typeof exerciseId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid exerciseId",
      });
    }

    const attempts =
      await getExerciseAttemptsByExercise(exerciseId);

    return res.status(200).json({
      success: true,
      data: attempts,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAttemptById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (typeof id !== "string") {
      return res.status(400).json({
        success: false,
        message: "Invalid attempt id",
      });
    }

    const attempt = await getExerciseAttemptById(id);

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Exercise attempt not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: attempt,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};