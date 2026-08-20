import { Router } from "express";

import {
  createExerciseOptionController,
  getAllExerciseOptionsController,
  getExerciseOptionsByExerciseController,
  getExerciseOptionByIdController,
  updateExerciseOptionController,
  deleteExerciseOptionController,
} from "../controllers/exerciseOption.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/exercise-options:
 *   post:
 *     summary: Create an exercise option (admin only)
 *     tags:
 *       - Exercise Options
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateExerciseOptionRequest'
 *     responses:
 *       201:
 *         description: Exercise option created successfully
 *       400:
 *         description: Required fields are missing
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       500:
 *         description: Internal server error
 */
router.post(
  "/",
  authenticate,
  requireAdmin,
  createExerciseOptionController
);

/**
 * @swagger
 * /api/exercise-options:
 *   get:
 *     summary: Get all exercise options
 *     tags:
 *       - Exercise Options
 *     responses:
 *       200:
 *         description: Exercise options retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get(
  "/",
  getAllExerciseOptionsController
);

/**
 * @swagger
 * /api/exercise-options/exercise/{exerciseId}:
 *   get:
 *     summary: Get options by exercise
 *     tags:
 *       - Exercise Options
 *     parameters:
 *       - in: path
 *         name: exerciseId
 *         required: true
 *         schema:
 *           type: string
 *         example: cm123exercise
 *     responses:
 *       200:
 *         description: Options retrieved successfully
 *       400:
 *         description: Exercise ID is required
 *       500:
 *         description: Internal server error
 */
router.get(
  "/exercise/:exerciseId",
  getExerciseOptionsByExerciseController
);

/**
 * @swagger
 * /api/exercise-options/{id}:
 *   get:
 *     summary: Get an exercise option by ID
 *     tags:
 *       - Exercise Options
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cm123option
 *     responses:
 *       200:
 *         description: Exercise option retrieved successfully
 *       404:
 *         description: Exercise option not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/:id",
  getExerciseOptionByIdController
);

/**
 * @swagger
 * /api/exercise-options/{id}:
 *   put:
 *     summary: Update an exercise option (admin only)
 *     tags:
 *       - Exercise Options
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cm123option
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateExerciseOptionRequest'
 *     responses:
 *       200:
 *         description: Exercise option updated successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Exercise option not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/:id",
  authenticate,
  requireAdmin,
  updateExerciseOptionController
);

/**
 * @swagger
 * /api/exercise-options/{id}:
 *   delete:
 *     summary: Delete an exercise option (admin only)
 *     tags:
 *       - Exercise Options
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cm123option
 *     responses:
 *       200:
 *         description: Exercise option deleted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 *       404:
 *         description: Exercise option not found
 *       500:
 *         description: Internal server error
 */
router.delete(
  "/:id",
  authenticate,
  requireAdmin,
  deleteExerciseOptionController
);

export default router;