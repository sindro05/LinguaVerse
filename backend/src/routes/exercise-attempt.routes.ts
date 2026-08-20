import { Router } from "express";

import {
  createAttempt,
  getAttemptsByUser,
  getAttemptsByExercise,
  getAttemptById,
} from "../controllers/exercise-attempt.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/role.middleware.js";
import { requireOwnership } from "../middleware/ownership.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/exercise-attempts:
 *   post:
 *     tags:
 *       - Exercise Attempts
 *     summary: Submit an answer to an exercise
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateExerciseAttemptRequest'
 *     responses:
 *       201:
 *         description: Exercise attempt created successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Authentication required
 *       403:
 *         description: You can only submit attempts for yourself
 *       404:
 *         description: Exercise not found
 */
router.post(
  "/",
  authenticate,
  requireOwnership("body", "userId"),
  createAttempt
);

/**
 * @swagger
 * /api/exercise-attempts/user/{userId}:
 *   get:
 *     tags:
 *       - Exercise Attempts
 *     summary: Get all attempts of a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attempts retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: You can only access your own data
 */
router.get(
  "/user/:userId",
  authenticate,
  requireOwnership("params", "userId"),
  getAttemptsByUser
);

/**
 * @swagger
 * /api/exercise-attempts/exercise/{exerciseId}:
 *   get:
 *     tags:
 *       - Exercise Attempts
 *     summary: Get all attempts for an exercise (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: exerciseId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Attempts retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin access required
 */
router.get(
  "/exercise/:exerciseId",
  authenticate,
  requireAdmin,
  getAttemptsByExercise
);

/**
 * @swagger
 * /api/exercise-attempts/{id}:
 *   get:
 *     tags:
 *       - Exercise Attempts
 *     summary: Get an exercise attempt by ID
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
 *         description: Attempt retrieved successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Attempt not found
 */
router.get("/:id", authenticate, getAttemptById);

export default router;