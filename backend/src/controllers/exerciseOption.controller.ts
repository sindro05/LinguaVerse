import { Request, Response } from "express";

import {
  createExerciseOption,
  getAllExerciseOptions,
  getExerciseOptionsByExercise,
  getExerciseOptionById,
  updateExerciseOption,
  deleteExerciseOption,
} from "../services/exerciseOption.service.js";

// CREATE
export const createExerciseOptionController = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      exerciseId,
      text,
      isCorrect,
      order,
    } = req.body;

    if (
      !exerciseId ||
      !text ||
      order === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "exerciseId, text and order are required",
      });
    }

    const option = await createExerciseOption({
      exerciseId,
      text,
      isCorrect,
      order,
    });

    return res.status(201).json({
      success: true,
      message: "Exercise option created successfully",
      data: option,
    });
  } catch (error) {
    console.error(
      "Create exercise option error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to create exercise option",
    });
  }
};

// GET ALL
export const getAllExerciseOptionsController = async (
  _req: Request,
  res: Response
) => {
  try {
    const options = await getAllExerciseOptions();

    return res.status(200).json({
      success: true,
      count: options.length,
      data: options,
    });
  } catch (error) {
    console.error(
      "Get exercise options error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to get exercise options",
    });
  }
};

// GET BY EXERCISE
export const getExerciseOptionsByExerciseController =
  async (req: Request, res: Response) => {
    try {
      const exerciseId =
        req.params.exerciseId as string;

      if (!exerciseId) {
        return res.status(400).json({
          success: false,
          message: "Exercise ID is required",
        });
      }

      const options =
        await getExerciseOptionsByExercise(
          exerciseId
        );

      return res.status(200).json({
        success: true,
        count: options.length,
        data: options,
      });
    } catch (error) {
      console.error(
        "Get options by exercise error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to get exercise options",
      });
    }
  };

// GET BY ID
export const getExerciseOptionByIdController =
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Option ID is required",
        });
      }

      const option =
        await getExerciseOptionById(id);

      if (!option) {
        return res.status(404).json({
          success: false,
          message: "Exercise option not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: option,
      });
    } catch (error) {
      console.error(
        "Get exercise option error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to get exercise option",
      });
    }
  };

// UPDATE
export const updateExerciseOptionController =
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Option ID is required",
        });
      }

      const existingOption =
        await getExerciseOptionById(id);

      if (!existingOption) {
        return res.status(404).json({
          success: false,
          message: "Exercise option not found",
        });
      }

      const option =
        await updateExerciseOption(
          id,
          req.body
        );

      return res.status(200).json({
        success: true,
        message:
          "Exercise option updated successfully",
        data: option,
      });
    } catch (error) {
      console.error(
        "Update exercise option error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update exercise option",
      });
    }
  };

// DELETE
export const deleteExerciseOptionController =
  async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Option ID is required",
        });
      }

      const existingOption =
        await getExerciseOptionById(id);

      if (!existingOption) {
        return res.status(404).json({
          success: false,
          message: "Exercise option not found",
        });
      }

      await deleteExerciseOption(id);

      return res.status(200).json({
        success: true,
        message:
          "Exercise option deleted successfully",
      });
    } catch (error) {
      console.error(
        "Delete exercise option error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete exercise option",
      });
    }
  };