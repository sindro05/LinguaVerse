import { Router } from "express";

import {
  createExerciseController,
  getAllExercisesController,
  getExercisesByLessonController,
  getExerciseByIdController,
  updateExerciseController,
  deleteExerciseController,
} from "../controllers/exercise.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/exercises:
 *   post:
 *     summary: Create an exercise (admin only)
 *     tags:
 *       - Exercises
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateExerciseRequest'
 *     responses:
 *       201:
 *         description: Exercise created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 */
router.post("/", authenticate, requireAdmin, createExerciseController);

/**
 * @swagger
 * /api/exercises:
 *   get:
 *     summary: Get all exercises
 *     tags:
 *       - Exercises
 *     responses:
 *       200:
 *         description: List of exercises
 */
router.get("/", getAllExercisesController);

/**
 * @swagger
 * /api/exercises/lesson/{lessonId}:
 *   get:
 *     summary: Get exercises by lesson
 *     tags:
 *       - Exercises
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of exercises for the lesson
 */
router.get(
  "/lesson/:lessonId",
  getExercisesByLessonController
);

/**
 * @swagger
 * /api/exercises/{id}:
 *   get:
 *     summary: Get an exercise by ID
 *     tags:
 *       - Exercises
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Exercise found
 *       404:
 *         description: Exercise not found
 */
router.get(
  "/:id",
  getExerciseByIdController
);

/**
 * @swagger
 * /api/exercises/{id}:
 *   put:
 *     summary: Update an exercise (admin only)
 *     tags:
 *       - Exercises
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateExerciseRequest'
 *     responses:
 *       200:
 *         description: Exercise updated successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Exercise not found
 */
router.put(
  "/:id",
  authenticate,
  requireAdmin,
  updateExerciseController
);

/**
 * @swagger
 * /api/exercises/{id}:
 *   delete:
 *     summary: Delete an exercise (admin only)
 *     tags:
 *       - Exercises
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Exercise deleted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Exercise not found
 */
router.delete(
  "/:id",
  authenticate,
  requireAdmin,
  deleteExerciseController
);

export default router;